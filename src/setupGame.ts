import config from './gameConfig'
import { Rectangle, Mouse, Ball } from './types'
import handlePhysics from './physics'

const setupCanvas = () => {
    const canvas: HTMLCanvasElement = document.getElementById(
        'main-canvas'
    ) as HTMLCanvasElement
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

    return {
        ctx,
        canvas,
    }
}

const { ctx, canvas } = setupCanvas()

export const setupGame = () => {
    const mouse = new Mouse()

    const balls: Ball[] = [
        new Ball(
            ctx,
            canvas.width / 2,
            canvas.height / 2,
            0,
            config.ball.initialSpeedY,
            config.ball.radius,
            config.ball.color
        ),
    ]

    const platform = new Rectangle(
        ctx,
        canvas.width / 2 - config.platform.width,
        canvas.height - config.platform.y,
        config.platform.width,
        config.platform.height,
        config.platform.color
    )

    const generateBlocks = (row: number, col: number): void => {}

    const runAnimation = (): void => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        platform.update(mouse.x - config.platform.width / 2)

        handlePhysics(platform, balls)

        for (let i = 0; i < balls.length; i++) {
            balls[i].update()
        }

        requestAnimationFrame(runAnimation)
    }

    return {
        runAnimation,
        mouse,
        balls,
        platform,
    }
}
