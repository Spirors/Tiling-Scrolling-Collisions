/*
 * This provides responses to UI input.
 */
import {AnimatedSprite} from "../scene/sprite/AnimatedSprite"
import {SceneGraph} from "../scene/SceneGraph"
import { Viewport } from "../scene/Viewport";

export class UIController {
    private spriteToDrag : AnimatedSprite;
    private scene : SceneGraph;
    private dragOffsetX : number;
    private dragOffsetY : number;

    public constructor(canvasId : string, initScene : SceneGraph) {
        this.spriteToDrag = null;
        this.scene = initScene;
        this.dragOffsetX = -1;
        this.dragOffsetY = -1;

        let canvas : HTMLCanvasElement = <HTMLCanvasElement>document.getElementById(canvasId);
        canvas.addEventListener("mousedown", this.mouseDownHandler);
        canvas.addEventListener("mousemove", this.mouseMoveHandler);
        canvas.addEventListener("mouseup", this.mouseUpHandler);
        this.wasdHandler();
    }

    public mouseDownHandler = (event : MouseEvent) : void => {
        let mousePressX : number = event.clientX;
        let mousePressY : number = event.clientY;
        let sprite : AnimatedSprite = this.scene.getSpriteAt(mousePressX, mousePressY);
        console.log("mousePressX: " + mousePressX);
        console.log("mousePressY: " + mousePressY);
        console.log("sprite: " + sprite);
        if (sprite != null) {
            // START DRAGGING IT
            this.spriteToDrag = sprite;
            this.dragOffsetX = sprite.getPosition().getX() - mousePressX;
            this.dragOffsetY = sprite.getPosition().getY() - mousePressY;
        }
    }
    
    public mouseMoveHandler = (event : MouseEvent) : void => {
        if (this.spriteToDrag != null) {
            this.spriteToDrag.getPosition().set(event.clientX + this.dragOffsetX, 
                                                event.clientY + this.dragOffsetY, 
                                                this.spriteToDrag.getPosition().getZ(), 
                                                this.spriteToDrag.getPosition().getW());
        }
    }

    public mouseUpHandler = (event : MouseEvent) : void => {
        this.spriteToDrag = null;
    }

    public wasdHandler(){
        let viewport = this.scene.getViewport();
        window.onload = function() {
            document.addEventListener('keydown', function(event) {
                let keyCode = event.keyCode;
                switch (keyCode) {
                    case 87: //w
                        console.log("w");
                        if (viewport.getY() > 0){
                            viewport.inc(0, -3);
                        }
                        break;
                    case 65: //a
                        console.log("a");
                        if (viewport.getX() > 0){
                            viewport.inc(-3, 0);
                        }
                        break;
                    case 83: //s
                        console.log("s");
                        if (viewport.getY() < viewport.getHeight()){
                            viewport.inc(0, 3);
                        }
                        break;
                    case 68: //d
                        console.log("d");
                        if (viewport.getX() < viewport.getWidth()){
                            viewport.inc(3, 0);
                        }
                        break;
                }
            }, false);
        }
    }
}