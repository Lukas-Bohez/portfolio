import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

import { env } from '@/lib/env';

type RevalidateBody = {
  secret?: string;
  tags?: string[];
  path?: string;
};

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = (await request.json()) as RevalidateBody;

  if (!body.secret || body.secret !== env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ ok: false, message: 'Invalid secret' }, { status: 401 });
  }

  if (Array.isArray(body.tags) && body.tags.length > 0) {
    body.tags.forEach((tag) => revalidateTag(tag, 'max'));
  }

  if (body.path) {
    revalidatePath(body.path);
  }

  revalidateTag('projects', 'max');
  revalidateTag('profile', 'max');
  revalidateTag('settings', 'max');

  return NextResponse.json({
    ok: true,
    revalidated: true,
    tags: body.tags ?? ['projects', 'profile', 'settings'],
    path: body.path ?? null,
  });
}
