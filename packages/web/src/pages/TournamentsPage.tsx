import { BaseLayout } from "../layouts/BaseLayout"
import type { ITournament } from "@rexton/shared"

/**
 * Tournaments page component
 */
export function TournamentsPage(): React.JSX.Element {
    // Sample tournament data
    const tournaments: ITournament[] = [
        {
            id: "1",
            name: "Summer Championship 2025",
            gameMode: "Summoner's Rift",
            map: "Summoner's Rift",
            startDate: new Date("2025-07-01"),
            endDate: new Date("2025-07-31"),
            participants: []
        },
        {
            id: "2",
            name: "ARAM Showdown",
            gameMode: "ARAM",
            map: "Howling Abyss",
            startDate: new Date("2025-06-15"),
            endDate: new Date("2025-06-30"),
            participants: []
        }
    ]

    return (
        <BaseLayout title="Tournaments">
            <h2>Active Tournaments</h2>
            <div style={{ display: "grid", gap: "1rem" }}>
                {tournaments.map((tournament) => (
                    <div key={tournament.id} className="card">
                        <h3>{tournament.name}</h3>
                        <p>
                            <strong>Game Mode:</strong> {tournament.gameMode}
                        </p>
                        <p>
                            <strong>Map:</strong> {tournament.map}
                        </p>
                        <p>
                            <strong>Start Date:</strong>{" "}
                            {tournament.startDate.toLocaleDateString()}
                        </p>
                        <p>
                            <strong>End Date:</strong>{" "}
                            {tournament.endDate.toLocaleDateString()}
                        </p>
                        <button className="button">Register</button>
                    </div>
                ))}
            </div>
        </BaseLayout>
    )
}
