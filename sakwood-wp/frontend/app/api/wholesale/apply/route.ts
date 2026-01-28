import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const { companyName, taxId, businessType, businessAddress, businessCity, businessProvince, businessPostalCode, businessPhone, estimatedMonthlyVolume } = body;

    if (!companyName || !taxId || !businessType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate Tax ID (13 digits for Thailand)
    const taxIdClean = taxId.replace(/\D/g, '');
    if (taxIdClean.length !== 13) {
      return NextResponse.json(
        { error: 'Tax ID must be 13 digits' },
        { status: 400 }
      );
    }

    // TODO: In production, this would:
    // 1. Save to WordPress database via custom endpoint
    // 2. Send email notification to admin
    // 3. Send confirmation email to applicant

    // For now, simulate a successful application
    // In a real implementation, you would call your WordPress API here

    // Simulate application ID
    const applicationId = `WSL-${Date.now()}`;

    // Return success response
    return NextResponse.json({
      success: true,
      applicationId,
      status: 'pending',
      message: 'Application submitted successfully. Please wait 2-3 business days for review.',
      user: {
        // In production, this would come from the updated user data from WordPress
        wholesaleStatus: 'pending',
        businessName: companyName,
        taxId: taxIdClean,
      }
    });

  } catch (error) {
    console.error('Wholesale application error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
