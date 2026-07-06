import { NextRequest, NextResponse } from "next/server";
import { getServerEnv } from "@/lib/env";
import { ApiFootballSyncService } from "@/lib/football-data/sync/api-football-sync";

type SyncTarget = "all" | "teams" | "fixtures" | "standings";

export async function GET(request: NextRequest) {
  return runSync(request);
}

export async function POST(request: NextRequest) {
  return runSync(request);
}

async function runSync(request: NextRequest) {
  try {
    assertCronSecret(request);

    const target = getSyncTarget(request);
    const service = new ApiFootballSyncService();
    const result =
      target === "teams"
        ? await service.syncTeamsOnly()
        : target === "fixtures"
          ? await service.syncFixturesOnly()
          : target === "standings"
            ? await service.syncStandingsOnly()
            : await service.syncAll();

    return NextResponse.json({
      ok: true,
      target,
      result
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Unknown sync error"
      },
      { status: 500 }
    );
  }
}

function assertCronSecret(request: NextRequest) {
  const env = getServerEnv();
  const isVercelCron =
    process.env.VERCEL === "1" &&
    request.headers.get("user-agent") === "vercel-cron/1.0" &&
    Boolean(request.headers.get("x-vercel-cron-schedule"));

  if (isVercelCron) {
    return;
  }

  if (!env.cronSecret) {
    throw new Error("CRON_SECRET must be set before sync routes can run.");
  }

  const headerSecret = request.headers.get("authorization")?.replace("Bearer ", "");
  const querySecret = request.nextUrl.searchParams.get("secret");

  if (headerSecret !== env.cronSecret && querySecret !== env.cronSecret) {
    throw new Error("Invalid cron secret.");
  }
}

function getSyncTarget(request: NextRequest): SyncTarget {
  const target = request.nextUrl.searchParams.get("target");

  if (
    target === "teams" ||
    target === "fixtures" ||
    target === "standings" ||
    target === "all"
  ) {
    return target;
  }

  return "all";
}
