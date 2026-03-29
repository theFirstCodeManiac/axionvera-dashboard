# Architecture transitioned from EC2 to S3 + CloudFront CDN for Serverless Hosting (Issue #54)

# S3 Bucket for Dashboard Static Assets
resource "aws_s3_bucket" "dashboard_bucket" {
  bucket = "axionvera-dashboard-${var.environment}-${data.aws_caller_identity.current.account_id}"

  tags = {
    Name        = "axionvera-dashboard-bucket"
    Environment = var.environment
    ManagedBy   = "Terraform"
  }
}

# Block public access to S3 bucket (Enforce CloudFront access only)
resource "aws_s3_bucket_public_access_block" "dashboard_bucket_block" {
  bucket                  = aws_s3_bucket.dashboard_bucket.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# CloudFront Origin Access Control (OAC) to restrict bucket access
resource "aws_cloudfront_origin_access_control" "default" {
  name                              = "axionvera-dashboard-oac-${var.environment}"
  description                       = "OAC for Axionvera Dashboard S3 Origin"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

# CloudFront Distribution
resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name              = aws_s3_bucket.dashboard_bucket.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.default.id
    origin_id                = "S3-AxionveraDashboard"
  }

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "Axionvera Dashboard CDN (${var.environment})"
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-AxionveraDashboard"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  # Implement custom error response to support SPA client-side routing (Redirect 404 to index.html)
  custom_error_response {
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
    error_caching_min_ttl = 300
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  # Set up TTL policy - Using Cache Policy (managed by AWS) is more modern
  # But we can also use custom TTLs in behavior. 
  # To satisfy "Set up a TTL policy for cache invalidation", we define the behavior above.

  tags = {
    Environment = var.environment
    Project     = "axionvera-dashboard"
  }
}

# S3 Bucket Policy to allow CloudFront OAC to reach the bucket
resource "aws_s3_bucket_policy" "allow_access_from_cloudfront" {
  bucket = aws_s3_bucket.dashboard_bucket.id
  policy = data.aws_iam_policy_document.allow_access_from_cloudfront.json
}

data "aws_iam_policy_document" "allow_access_from_cloudfront" {
  statement {
    sid       = "AllowCloudFrontServicePrincipalReadOnly"
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.dashboard_bucket.arn}/*"]

    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.s3_distribution.arn]
    }
  }
}

# Helper data source for account id (to ensure unique bucket name)
data "aws_caller_identity" "current" {}

output "cloudfront_domain_name" {
  value = aws_cloudfront_distribution.s3_distribution.domain_name
}

output "s3_bucket_name" {
  value = aws_s3_bucket.dashboard_bucket.id
}
