import { globalStore } from "@/store";
import { Player, Room, GobangDTO } from "@/types/store";

export default {
    fail(data: any) {
        alert(data)
    },
    hallChat(dialogMsg: GobangDTO) {
        globalStore.dispatch('setHallDialogMsg', dialogMsg)
    },
    async getHallDialog(dialog: GobangDTO[]) {
        for (let dialogMsg of dialog) {
             await this.hallChat(dialogMsg)
        }
    },
    getRooms(rooms: Room[]) {
        globalStore.dispatch('setRooms', rooms)
    },
    createRoom(room: Room) {
        globalStore.dispatch('addRoom', room)
        this.enterRoom(room)
    },
    enterRoom(room: Room) {
        globalStore.dispatch('addTab', room).then(() => {
            globalStore.dispatch('changeTab', room.id)
            globalStore.dispatch(('setPlayerTable'), {
                roomId: room.id,
                players: room.spectators
            })
            globalStore.dispatch('setMatchDetails', {
                roomId: room.id,
                host: room.host,
                challenger: room.challenger
            })
            globalStore.dispatch('setChessboard', {
                roomId: room.id,
                steps: room.steps
            })
        })
    },
    leaveRoom(room: Room) {
        globalStore.dispatch('addTab', room).then(() => {
            globalStore.dispatch('setPlayerTable', {
                roomId: room.id,
                players: room.spectators
            })
            globalStore.dispatch('setMatchDetails', {
                roomId: room.id,
                host: room.host,
                challenger: room.challenger
            })

            globalStore.dispatch('setChessboard', {
                roomId: room.id,
                steps: room.steps
            })
        })
    },
    delRoom(roomId: string) {
        globalStore.dispatch('removeTab', roomId)
        globalStore.dispatch('delRoomById', roomId)
    },
    roomChat(roomChatDTO: object) {
        globalStore.dispatch('setRoomChatDTO', roomChatDTO)
    },

    getPlayer(player: Player) {
        globalStore.dispatch('setPlayer', player)
    },
    getPlayers(players: Player[]) {
        let playerTable = {
            roomId: 'hall',
            players
        }
        globalStore.dispatch('setPlayerTable', playerTable)
    },
    setReady(room: Room) {
        globalStore.dispatch('setMatchDetails', {
            roomId: room.id,
            host: room.host,
            challenger: room.challenger
        })
    },
    makeStep(step: object) {
        globalStore.dispatch('setStep', step)
    },
    gameOver(gameOverDTO: object) {
        globalStore.dispatch('setGameOverDTO', gameOverDTO)
    },
    askDraw(drawDTO: object) {
        globalStore.dispatch('setDrawDTO', drawDTO)
    },
    retractStep(retractDTO: object) {
        globalStore.dispatch('setRetractDTO', retractDTO)
    }
}
