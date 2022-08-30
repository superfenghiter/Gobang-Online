<template>
    <el-container>
        <el-header style="height: 20px; display: block; text-align: center">
            <span v-if="!started" style="font-size: large; font-weight: bold">{{title}}</span>
            <el-button size="mini" style="float: right" @click="onExit()">{{$t('chessboard.button.exit')}}</el-button>
        </el-header>
        <el-main>
            <canvas :id="roomId" @click="onClick">Your browser doesn't support canvas</canvas>
        </el-main>
        <el-footer align="center" style="height: 20px">
            <el-button size="mini" @click="onRetract()" :disabled="buttonDisabled">{{$t('chessboard.button.retract')}}</el-button>
            <el-button size="mini" @click="onSurrender()" :disabled="buttonDisabled">{{$t('chessboard.button.surrender')}}</el-button>
            <el-button size="mini" @click="onDraw()" :disabled="buttonDisabled">{{$t('chessboard.button.draw')}}</el-button>
        </el-footer>
    </el-container>
</template>

<script setup lang="ts">

import constant from "../constants/color";
import {askDraw, leaveRoom, makeStep, retractStep, surrender} from "../websocket/send-api";
import {setPlayerStatus} from "../websocket/send-api";
import { useStore } from "@/store";
import { computed, onMounted, watch } from "vue";
import { Step } from "@/types/store";
import { ElMessage, ElMessageBox } from 'element-plus'
import i18n from "@/locals";

const { t } = i18n.global;
const store = useStore();

// let canvas;
// let context
//canvas边长
const side = 495
// 棋盘格子边长
const d = 33
//棋盘格子距离棋盘边缘的距离
const m = d / 2
//棋子半径
const r = 15
// let turn = constants.black
// let steps = []

const props = defineProps<{
    roomId: string
}>();

let context: CanvasRenderingContext2D;
let steps: Step[]
let myColor = -1
let title = t('chessboard.message.clickReady')
let started = false
let waitResponse =  false

const matchDetails = computed(() => store.getters.matchDetails)
const turn = computed(() => steps.length % 2)
const chessboardDisabled = computed(() => myColor !== turn.value || waitResponse)
const buttonDisabled = computed(() => myColor === -1 || waitResponse)
const step = computed(() => store.getters.step)
const gameOverDTO = computed(() => store.getters.gameOverDTO)
const chessboard = computed(() => store.getters.chessboard)
const drawDTO = computed(() => store.getters.drawDTO)
const retractDTO = computed(() => store.getters.retractDTO)


function initCanvas() {
    let canvas = document.getElementById(props.roomId) as HTMLCanvasElement;
    console.log('canvas' + canvas)
    canvas.width = side
    canvas.height = side
    context = canvas.getContext('2d') as CanvasRenderingContext2D;
}

function drawChessboard() {
    for (let i = 0; i < 15; i++) {
        context.moveTo(m + i * d , m);
        context.lineTo(m + i * d , side - m);
        context.stroke();
        context.moveTo(m , m + i * d);
        context.lineTo(side - m, m + i * d);
        context.stroke();
    }
}

function drawChess(i: number, j: number, color: number) {
    context.beginPath()
    context.arc(m + i * d, m + j * d, r, 0, 2 * Math.PI)
    context.closePath()
    if (color === constant.black) {
        context.fillStyle = '#000000'
        context.fill()
    } else if (color === constant.white) {
        context.stroke()
        context.fillStyle = '#FFFFFF'
        context.fill()
    }
}

function drawLabel(i: number, j: number) {
    context.beginPath()
    context.arc(m + i * d, m + j * d, r / 3, 0, 2 * Math.PI)
    context.closePath()
    context.fillStyle = '#FFB90F'
    context.fill()
}

function labelLastStep() {
    let length = steps.length
    if (length > 0) {
        let lastStep = steps[length - 1]
        drawLabel(lastStep.i, lastStep.j)
        if (length > 1) {
            let index = length - 2
            let c = steps[index]
            drawChess(c.i, c.j, index % 2)
        }
    }
}

function removeChess(i: number, j: number) {
    context.clearRect((i) * d, (j) * d, d, d);
}

function hasStep(i:number, j:number) {
    for (let step of steps) {
        if (step.i === i && step.j === j) {
            return true
        }
    }
    return false
}

function chess(i: number, j: number) {
    steps.push({i, j})
    drawChess(i, j, 1 - turn.value)
    labelLastStep()
}

function onClick(e: { offsetX: any; offsetY: any; }) {
    if (chessboardDisabled) {
        return
    }
    let x = e.offsetX
    let y = e.offsetY
    let i = Math.floor(x / d)
    let j = Math.floor(y / d)
    if (!hasStep(i, j)) {
        chess(i, j)
        makeStep(props.roomId, i, j)
    }
}

function onRetract() {
    waitResponse = true
    ElMessage.info(t('chessboard.message.retractSent'))
    retractStep(props.roomId, 1)
}

function onExit() {
    store.dispatch('removeTab', props.roomId)
    leaveRoom(props.roomId)
    setPlayerStatus("leisure")
}

function onSurrender() {
    surrender(props.roomId)
}

function onDraw() {
    waitResponse = true
    ElMessage.info(t('chessboard.message.drawSent'))
    askDraw(props.roomId, 1)
}


watch(matchDetails, (newValue, oldValue) => {
    if (newValue.roomId === props.roomId) {
        if (newValue.host.ready && newValue.challenger.ready) {
            started = true
            steps = []
            context.clearRect(0, 0, side, side)
            let id = store.getters.player.id
            if (newValue.host.id === id) {
                myColor = newValue.host.color
                return
            } else if (newValue.challenger.id === id) {
                myColor = newValue.challenger.color
                return
            }
        }
        myColor = -1
    }
})

watch(step, (newValue, oldValue) => {
    if (newValue.rid === props.roomId && !hasStep(newValue.i, newValue.j)) {
        chess(newValue.i, newValue.j)
    }
})

watch(gameOverDTO, (newValue, oldValue) => {
    if (newValue.rid === props.roomId) {
        started = false
        if (newValue.cause === 'five') {
            title = t('chessboard.message.over.five') + newValue.winner.name
        } else if (newValue.cause === 'escape') {
            title = newValue.loser.name + t('chessboard.message.over.escape') + newValue.winner.name
        } else if (newValue.cause === 'surrender') {
            title = newValue.loser.name + t('chessboard.message.over.surrender') + newValue.winner.name
        } else if (newValue.cause === 'draw') {
            waitResponse = false
            title = t('chessboard.message.over.draw')
        } else {
            title = ''
        }
        ElMessageBox.alert(title)
        myColor = -1
    }
})

watch(chessboard, (newValue, oldValue) => {
    if (newValue.roomId === props.roomId) {
        steps = newValue.steps
        steps.forEach((step, index) => {
            drawChess(step.i, step.j, index % 2)
        })
        labelLastStep()
    }
})

watch(drawDTO, (newValue, oldValue) => {
    if (newValue.rid === props.roomId) {
        if (newValue.consent === 1) {
            ElMessageBox.confirm(t('chessboard.message.askDraw.info'), t('chessboard.message.askDraw.title'), {
                confirmButtonText: t('pop.yes'),
                cancelButtonText: t('pop.no'),
                type: 'info'
            }).then(() => {
                askDraw(props.roomId, 2)
            }).catch(() => {
                askDraw(props.roomId, 0)
            })
        } else if (newValue.consent === 0) {
            waitResponse = false
            ElMessageBox.alert(t('chessboard.message.rejectDraw.info'), t('chessboard.message.rejectDraw.title'))
        }
    }
})

watch(retractDTO, (newValue, oldValue) => {
    if (newValue.rid === props.roomId) {
        if (newValue.consent === 1) {
            ElMessageBox.confirm(t('chessboard.message.askRetract.info'), t('chessboard.message.askRetract.title'), {
                confirmButtonText: t('pop.yes'),
                cancelButtonText: t('pop.no'),
                type: 'info'
            }).then(() => {
                retractStep(props.roomId, 2)
            }).catch(() => {
                retractStep(props.roomId, 0)
            })
        } else if (newValue.consent === 0) {
            waitResponse = false
            ElMessageBox.alert(t('chessboard.message.rejectRetract.info'), t('chessboard.message.rejectRetract.title'))
        } else if (newValue.consent === 2) {
            ElMessage.info(t('chessboard.message.agreeRetract.info'))
            for (let i = 0; i < newValue.count; i++) {
                let lastIndex = steps.length - 1
                let step = steps[lastIndex]
                removeChess(step.i, step.j)
                steps.splice(lastIndex, 1)
            }
            labelLastStep()
            waitResponse = false
        }
    }
})

onMounted(() => {
    initCanvas()
})
</script>

<style scoped>
    canvas {
        display: block;
        margin: 0px auto;
        box-shadow: -2px -2px 2px #EFEFEF, 5px 5px 5px #B9B9B9;
        cursor: pointer;
        pointer-events: auto;
        background-image: url("../assets/images/chessboard.jpg");
        background-size: 100% 100%;
    }
</style>