import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  return NextResponse.json(
    { error: 'Registration is disabled. Please contact the administrator for account setup.' },
    { status: 403 }
  );
}
