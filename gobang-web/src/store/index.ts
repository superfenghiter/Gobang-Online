import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { Player, Room, PlayerTable, Step, GobangDTO } from '@/types/store'

export interface State {
    player: Player,
    playerTable: PlayerTable,
    step: Step,
    chessboard: {
        roomId: string,
        steps: Step[]
    },
    matchDetails: {
        roomId: '',
        host: {
            name: 'Tom',
            color: 'black',
            turn: true,
            roomStatus: 'ready'
        },
        challenger: {
            name: 'Ann',
            color: 'white',
            turn: false,
            roomStatus: 'unready'
        }
    },
    roomChatDTO: {},
    gameOverDTO: {},
    drawDTO: {},
    retractDTO: {},
    hallDialogMsg: GobangDTO,
    activeTabKey: string,
    tabs: {
        roomId: string,
        title: string,
        type: string
    }[],
    rooms: Room[]
}
  
export const key: InjectionKey<Store<State>> = Symbol()
  
export const store = createStore<State>({
    state: {
        player: {
            id: "x",
            name: "x",
            status: "x",
            color: 0,
            ready: false
        },
        playerTable: {
            roomId: '',
            players: []
        },
        step: {
            i: 0,
            j: 0
        },
        chessboard: {
            roomId: '',
            steps: []
        },
        matchDetails: {
            roomId: '',
            host: {
                name: 'Tom',
                color: 'black',
                turn: true,
                roomStatus: 'ready'
            },
            challenger: {
                name: 'Ann',
                color: 'white',
                turn: false,
                roomStatus: 'unready'
            }
        },
        roomChatDTO: {},
        gameOverDTO: {},
        drawDTO: {},
        retractDTO: {},
        hallDialogMsg: {
            "time": "2020-03-31 16:43:00",
            "from": "sys",
            "content": "Welcome to Gobang Online!"
        },
        activeTabKey: 'hall',
        tabs: [{
            roomId: 'hall',
            title: '【Hall】',
            type: 'hall'
        }],
        rooms: []
    },
    getters: {
        tabs: (state: State) => state.tabs,
        activeTabKey: (state: State) => state.activeTabKey,
        player: (state: State) => state.player,
        playerTable: (state: State) => state.playerTable,
        step: (state: State) => state.step,
        chessboard: (state: State) => state.chessboard,
        matchDetails: (state: State) => state.matchDetails,
        roomChatDTO: (state: State) => state.roomChatDTO,
        gameOverDTO: (state: State) => state.gameOverDTO,
        drawDTO: (state: State) => state.drawDTO,
        retractDTO: (state: State) => state.retractDTO,
        hallDialogMsg: (state: State) => state.hallDialogMsg,
        rooms: (state: State) => state.rooms
    },
    mutations: {
        addTab(state: State, room: Room) {
            let newTab = {
                roomId: room.id,
                title: '【Room】'+ room.host.name + ' vs ' + room.challenger.name,
                type: 'room',
            }
            for (let i in state.tabs) {
                if (state.tabs[i].roomId === room.id) {
                    state.tabs[i].title = newTab.title
                    return
                }
            }
            state.tabs.push(newTab)
        },
        removeTab(state: State, roomId: string) {
            let tabIndex = -1
            state.tabs.forEach((tab, i) => {
                if (tab.roomId === roomId) {
                    tabIndex = i
                }
            })
            if (tabIndex !== -1) {
                state.tabs.splice(tabIndex, 1)
                state.activeTabKey = 'hall'
            }
        },
        changeTab(state: State, roomId: string) {
            state.activeTabKey = roomId
        },
        setPlayer(state: State, player: Player) {
            state.player = player
        },
        playerRename(state: State, name: string) {
            state.player.name = name
        },
        setPlayerTable(state: State, playerTable) {
            state.playerTable = playerTable
        },
        setStep(state: State, step) {
            state.step = step
        },
        setChessboard(state: State, chessboard) {
            state.chessboard = chessboard
        },
        setMatchDetails(state: State, matchDetails) {
            state.matchDetails = matchDetails
        },
        setRoomChatDTO(state: State, roomChatDTO) {
            state.roomChatDTO = roomChatDTO
        },
        setGameOverDTO(state: State, gameOverDTO) {
            state.gameOverDTO = gameOverDTO
        },
        setDrawDTO(state: State, drawDTO) {
            state.drawDTO = drawDTO
        },
        setRetractDTO(state: State, retractDTO) {
            state.retractDTO = retractDTO
        },
        setHallDialogMsg(state: State, dialogMsg) {
            state.hallDialogMsg = dialogMsg
        },
        setRooms(state: State, rooms: Room[]) {
            state.rooms = rooms
        },
        addRoom(state: State, room: Room) {
            state.rooms.push(room)
        },
        delRoomById(state: State, roomId: string) {
            let i: number = 0
            while (state.rooms[i].id !== roomId) {
                i++
            }
            state.rooms.splice(i, 1)
        }
    },
    actions: {
        addTab({commit}, room: Room) {
            commit('addTab', room)
        },
        removeTab({commit}, roomId: string) {
            commit('removeTab', roomId)
        },
        changeTab({commit}, roomId: string) {
            commit('changeTab', roomId)
        },
        setPlayer({commit}, player) {
            commit('setPlayer', player)
        },
        playerRename({commit}, name: string) {
            commit('playerRename', name)
        },
        setPlayerTable({commit}, playerTable) {
            commit('setPlayerTable', playerTable)
        },
        setStep({commit}, step) {
            commit('setStep', step)
        },
        setChessboard({commit}, chessboard) {
            commit('setChessboard', chessboard)
        },
        setMatchDetails({commit}, matchDetails) {
            commit('setMatchDetails', matchDetails)
        },
        setRoomChatDTO({commit}, roomChatDTO) {
            commit('setRoomChatDTO', roomChatDTO)
        },
        setGameOverDTO({commit}, gameOverDTO) {
            commit('setGameOverDTO', gameOverDTO)
        },
        setDrawDTO({commit}, drawDTO) {
            commit('setDrawDTO', drawDTO)
        },
        setRetractDTO({commit}, retractDTO) {
            commit('setRetractDTO', retractDTO)
        },
        setHallDialogMsg({commit}, dialogMsg) {
            commit('setHallDialogMsg', dialogMsg)
        },
        setRooms({commit}, rooms: Room[]) {
            commit('setRooms', rooms)
        },
        addRoom({commit}, room: Room) {
            commit('addRoom', room)
        },
        delRoomById({commit}, roomId: string) {
            commit('delRoomById', roomId)
        }
    }
})

export let globalStore: Store<State>
  
export function useStore () {
    return baseUseStore(key)
}

export function initStore() {
    globalStore = useStore();
}
