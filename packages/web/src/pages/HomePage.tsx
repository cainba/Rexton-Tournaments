import { BaseLayout } from "../layouts/BaseLayout"

/**
 * Home page component
 */
export function HomePage(): React.JSX.Element {
    return (
        <BaseLayout title="Home">
            <div className="card">
                <h2>Welcome to Rexton Tournaments</h2>
                <p>
                    Rexton Tournaments is a platform that allows Rexton gaming and 
                    public members to participate and compete in League of Legends 
                    tournaments.
                </p>
            </div>

            <div className="card">
                <h3>How It Works</h3>
                <ol style={{ paddingLeft: "2rem" }}>
                    <li>Browse available tournaments</li>
                    <li>Register for tournaments that interest you</li>
                    <li>Compete against other players</li>
                    <li>Climb the leaderboard and win prizes</li>
                </ol>
            </div>

            <div className="card">
                <h3>Featured Tournaments</h3>
                <p>Check out our latest tournaments and join the competition!</p>
                <a href="/tournaments" className="button">
                    View Tournaments
                </a>
            </div>
        </BaseLayout>
    )
}
