export interface Player {
    id: string,
    name: string,
    status: string,
    color: number,
    ready: boolean
}

export interface PlayerTable {
    roomId: string,
    players: Player[]
}

export interface Room {
    id: string,
    host: Player,
    challenger: Player,
    spectators: Player[],
    steps: Step[]
}

export interface Step {
    rid?: string,
    i: number,
    j: number
}

export interface GobangDTO {
    time: string,
    from: string,
    content: string
}