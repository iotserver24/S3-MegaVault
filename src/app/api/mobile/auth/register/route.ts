import { NextResponse } from 'next/server';

// Set CORS headers for mobile app
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST() {
  return NextResponse.json(
    { 
      error: 'Registration is disabled. Please contact the administrator for account setup.'
    },
    { status: 403, headers: corsHeaders }
  );
} 