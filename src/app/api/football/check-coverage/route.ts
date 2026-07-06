import { NextResponse } from "next/server";
import { ApiFootballSyncService } from "@/lib/football-data/sync/api-football-sync";

export async function GET() {
  try {
    const service = new ApiFootballSyncService();
    const coverage = await service.checkCoverage();

    return NextResponse.json(coverage);
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Unknown coverage error"
      },
      { status: 500 }
    );
  }
}
