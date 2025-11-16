// Shared types and utilities for Rexton Tournaments

export interface IAppState {
    user: IUser | null
    tournament: ITournament | null
    loading: boolean
}

export interface IUser {
    id: string
    username: string
    email: string
}

export interface ITournament {
    id: string
    name: string
    gameMode: string
    map: string
    startDate: Date
    endDate: Date
    participants: IUser[]
}

export interface ILayoutProps {
    title: string
    children: React.ReactNode
    state?: Partial<IAppState>
}

export interface IPageProps {
    path: string
    title: string
}
