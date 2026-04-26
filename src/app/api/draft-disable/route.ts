import { draftMode } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const redirectTo = request.nextUrl.searchParams.get('redirect') ?? '/cms-demo';
  const draft = await draftMode();
  draft.disable();

  return NextResponse.redirect(new URL(redirectTo, request.url));
}
