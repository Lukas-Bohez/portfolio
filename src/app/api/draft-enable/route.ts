import { draftMode } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { env } from '@/lib/env';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const secret = request.nextUrl.searchParams.get('secret');
  const redirectTo = request.nextUrl.searchParams.get('redirect') ?? '/cms-demo';

  if (!secret || secret !== env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ ok: false, message: 'Invalid secret' }, { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  return NextResponse.redirect(new URL(redirectTo, request.url));
}
