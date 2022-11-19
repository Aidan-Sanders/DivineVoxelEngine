import { PlayerStatesIndexes, PlayerStatesValues, } from "../Shared/Player.data.js";
import { DataTool } from "../../../../out/Tools/Data/DataTool.js";
export const GetNexusPlayer = async (DVEN, DVEPH, waitForMessageFromWorld = false) => {
    const gravity = 0.1;
    const playerPositionSAB = new SharedArrayBuffer(4 * 3);
    const playerPosition = new Float32Array(playerPositionSAB);
    DVEN.parentComm.listenForMessage("request-player-states", (data) => {
        DVEN.parentComm.sendMessage("connect-player-data", [playerPositionSAB]);
    });
    let worldReady = false;
    let playerDirection = new Float32Array();
    let playerStates = new Uint8Array();
    let ready = false;
    DVEN.parentComm.listenForMessage("connect-player-states", (data) => {
        playerDirection = new Float32Array(data[1]);
        playerStates = new Uint8Array(data[2]);
        ready = true;
    });
    const dataTool = new DataTool();
    await DVEN.UTIL.createPromiseCheck({
        checkInterval: 1,
        check: () => ready,
    });
    const player = DVEPH.createEntityObject({
        states: {
            cilmbingStair: false,
            inWater: false,
            onLadder: false,
        },
        finalDirection: DVEPH.math.getVector3(0, 0, 0),
        sideDirecton: DVEPH.math.getVector3(0, 0, 0),
        speed: 0.05,
        runSpeed: 0.05,
        hitBox: { w: 0.8, h: 1.8, d: 0.8 },
        jumpStates: {
            count: 0,
            max: 20,
            jumping: false,
            canJump: true,
        },
        gravityAcceleration: 0,
        playerStates: new Uint8Array(),
        playerDirection: new Float32Array(),
        playerPosition: new Float32Array(),
        $INIT(playerStates, playerDirection, playerPosition) { },
        controlsUpdate() { },
        getSpeed() {
            return (this.playerStates[PlayerStatesIndexes.running] * this.runSpeed + this.speed);
        },
        movementFunctions: {},
    });
    player.movementFunctions[PlayerStatesValues.still] = function () {
        this.direction.scaleXYZ(0);
    };
    player.movementFunctions[PlayerStatesValues.secondaryStill] = function () {
        this.sideDirecton.scaleXYZ(0);
    };
    player.movementFunctions[PlayerStatesValues.walkingForward] = function () { };
    player.movementFunctions[PlayerStatesValues.walkingBackward] = function () {
        this.direction.scaleXYZ(-1);
    };
    player.movementFunctions[PlayerStatesValues.walkingLeft] = function () { };
    player.movementFunctions[PlayerStatesValues.walkingRight] = function () {
        this.sideDirecton.scaleXYZ(-1);
    };
    player.doCollision = function (x, y, z, colliderName, colliderData) {
        if ((colliderName == "stair-bottom" || colliderName == "stair-top") &&
            colliderData.h < 0.3) {
            if (colliderData.nz == 1) {
                this.states.cilmbingStair = true;
                return;
            }
            if (colliderData.ny == 1) {
                this.states.cilmbingStair = false;
                return;
            }
        }
        this.states.cilmbingStair = false;
    };
    player.$INIT = function (playerStates, playerDirection, playerPosition) {
        this.playerStates = playerStates;
        this.playerDirection = playerDirection;
        this.playerPosition = playerPosition;
        this.setPosition(10, 80, 7);
        this.cachePosition();
        this.syncPosition(playerPosition);
        this.velocity.y = -gravity;
        for (const key of Object.keys(this.movementFunctions)) {
            const func = this.movementFunctions[Number(key)];
            this.movementFunctions[Number(key)] = func.bind(this);
        }
    };
    player.controlsUpdate = function () {
        this.finalDirection.scaleXYZ(0);
        this.direction.updateVector(this.playerDirection[0], 0, this.playerDirection[2]);
        this.direction.normalize();
        this.sideDirecton.updateVector(this.playerDirection[3], 0, this.playerDirection[5]);
        this.sideDirecton.normalize();
        this.movementFunctions[this.playerStates[PlayerStatesIndexes.movement]]();
        this.movementFunctions[this.playerStates[PlayerStatesIndexes.secondaryMovment]]();
        this.finalDirection.addFromVec3(this.direction);
        this.finalDirection.addFromVec3(this.sideDirecton);
        if (!this.finalDirection.isZero()) {
            this.finalDirection.normalize();
        }
        this.finalDirection.scaleXYZ(this.getSpeed());
        if (this.playerStates[PlayerStatesIndexes.movement] ||
            this.playerStates[PlayerStatesIndexes.secondaryMovment])
            this.velocity.x = this.finalDirection.x;
        this.velocity.z = this.finalDirection.z;
        if (this.onGround || this.states.inWater) {
            this.gravityAcceleration = 0;
        }
        if (this.playerStates[PlayerStatesIndexes.jumping] &&
            !this.jumpStates.jumping &&
            (this.onGround || this.states.inWater)) {
            this.jumpStates.jumping = true;
            if (this.states.inWater) {
                this.velocity.y = 0.2;
            }
            else {
                this.velocity.y = 0.3;
            }
            this.playerStates[PlayerStatesIndexes.jumping] = 0;
        }
        if (this.jumpStates.jumping) {
            if (this.jumpStates.count >= this.jumpStates.max) {
                this.jumpStates.count = 0;
                this.jumpStates.jumping = false;
            }
            else {
                if (this.states.inWater) {
                    this.velocity.y -= 0.01;
                }
                else {
                    this.velocity.y -= 0.01;
                }
                this.jumpStates.count++;
            }
        }
        if (!this.onGround && !this.jumpStates.jumping) {
            this.gravityAcceleration += 0.01;
            if (this.states.inWater) {
                this.velocity.y = -0.03;
            }
            else {
                this.velocity.y = -gravity;
                this.velocity.y -= this.gravityAcceleration;
            }
        }
    };
    player.beforeUpdate = function () {
        this.states.inWater = false;
        for (let y = this.position.y; y <= this.position.y + 1; y++) {
            for (let x = this.position.x - 1; x <= this.position.x + 1; x++) {
                for (let z = this.position.z - 1; z <= this.position.z + 1; z++) {
                    if (dataTool.loadIn(x >> 0, y >> 0, z >> 0)) {
                        if (dataTool.getSubstance() == "liquid") {
                            this.states.inWater = true;
                            break;
                        }
                    }
                }
            }
        }
        this.controlsUpdate();
        if (this.states.cilmbingStair) {
            this.setVelocity(0, 1, -1.5);
            this.velocity.scaleXYZ(this.getSpeed());
        }
        this.states.cilmbingStair = false;
    };
    player.afterUpdate = function () {
        this.syncPosition(this.playerPosition);
    };
    player.$INIT(playerStates, playerDirection, playerPosition);
    const runUpdate = () => {
        setTimeout(() => {
            setInterval(() => {
                player.update();
            }, 17);
        }, 2000);
    };
    if (!waitForMessageFromWorld) {
        runUpdate();
        return player;
    }
    DVEN.worldComm.listenForMessage("ready", (data) => {
        runUpdate();
        console.log("go");
    });
    return player;
};