import code from "../constants/msg-code";
import { send } from "./websocket";
import { globalStore } from "@/store";

export function hallChat(content: any) {
    send(code.HallChat, content)
}

export function getHallDialog() {
    send(code.GetHallDialog, "")
}

export function getRooms() {
    send(code.GetRooms, "")
}

export function createRoom(color: any) {
    send(code.CreateRoom, color)
}

export function enterRoom(rid: string, role: string) {
    send(code.EnterRoom, {
        rid,
        role
    })
}

export function leaveRoom(rid: string) {
    send(code.LeaveRoom, rid)
}

export function delRoom(rid: string) {
    send(code.DelRoom, rid)
}

export function roomChat(from: string, content: string, rid: string) {
    send(code.RoomChat, {
        from,
        content,
        rid
    })
}

export function getPlayer() {
    send(code.GetPlayer, "")
}

export function getPlayers() {
    send(code.GetPlayers, "")
}

export function playerRename(name: string) {
    globalStore.dispatch('playerRename', name)
    send(code.PlayerRename, name)
}

export function setPlayerStatus(status: string) {
    send(code.SetPlayerStatus, status)
}

export function setReady(rid: string, ready: boolean) {
    send(code.SetReady, {
        rid,
        ready
    })
}

export function makeStep(rid: string, i: number, j: number) {
    send(code.MakeStep, {
        rid,
        i,
        j
    })
}

export function surrender(rid: string) {
    send(code.Surrender, rid)
}

export function askDraw(rid: string, consent: number) {
    send(code.AskDraw, {
        rid,
        consent
    })
}

export function retractStep(rid: string, consent: number) {
    send(code.RetractStep, {
        rid,
        consent
    })
}