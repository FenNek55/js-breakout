import config from './gameConfig'
import { Rectangle, Mouse, Ball, Block } from './types'
import handlePhysics from './physics'

const setupCanvas = (width: number, height: number) => {
    const canvas: HTMLCanvasElement = document.getElementById(
        'main-canvas'
    ) as HTMLCanvasElement
    canvas.width = width
    canvas.height = height

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

    return {
        ctx,
        canvas,
    }
}

const { ctx, canvas } = setupCanvas(1280, 720)

export const setupGame = () => {
    const mouse = new Mouse(canvas)

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

    const blocks: Block[] = []

    const platform = new Rectangle(
        ctx,
        canvas.width / 2 - config.platform.width,
        canvas.height - config.platform.y,
        config.platform.width,
        config.platform.height,
        config.platform.color
    )

    const generateBlocks = (rows: number, columns: number): Block[] => {
        const totalWidth =
            rows * config.blocks.width + (rows - 1) * config.blocks.gap
        const x = canvas.width / 2 - totalWidth / 2

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < columns; col++) {
                blocks.push(
                    new Block(
                        ctx,
                        x + row * config.blocks.width + row * config.blocks.gap,
                        config.blocks.y +
                            col * config.blocks.height +
                            col * config.blocks.gap,
                        config.blocks.width,
                        config.blocks.height,
                        3
                    )
                )
            }
        }

        return blocks
    }

    const initGame = () => {
        console.log(generateBlocks(10, 5))
    }

    const runAnimation = (): void => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = config.canvas.background
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        platform.update(mouse.x - config.platform.width / 2)

        handlePhysics(platform, balls)

        for (let i = 0; i < balls.length; i++) {
            balls[i].update()
        }

        for (let i = 0; i < blocks.length; i++) {
            blocks[i].update()
        }

        requestAnimationFrame(runAnimation)
    }

    return {
        initGame,
        runAnimation,
        mouse,
        balls,
        platform,
    }
}
