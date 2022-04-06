import type { Rectangle, Ball, Block } from './types'

const handlePlatformCollisions = (platform: Rectangle, balls: Ball[]) => {
    for (let i = 0; i < balls.length; i++) {
        const ball = balls[i]

        if (ball.x >= platform.x && ball.x <= platform.x + platform.width) {
            if (
                ball.y + ball.radius >= platform.y &&
                ball.y - ball.radius <= platform.y + platform.height
            ) {
                ball.y = platform.y - ball.radius
                ball.vY *= -1
                ball.vX = -(platform.x + platform.width / 2 - ball.x) / 20
            }
        }
    }
}

const handleBlocksCollisions = (blocks: Block[], balls: Ball[]) => {
    let block: Block | null = null
    let ball: Ball | null = null

    for (let blockIndex = 0; blockIndex < blocks.length; blockIndex++) {
        for (let ballIndex = 0; ballIndex < balls.length; ballIndex++) {
            block = blocks[blockIndex]
            ball = balls[ballIndex]
            //bottom collision
            if (
                block.y + block.height >= ball.y - ball.radius &&
                block.y <= ball.y - ball.radius &&
                block.x <= ball.x &&
                block.x + block.width >= ball.x
            ) {
                ball.y = block.y + block.height + ball.radius
                ball.vY = Math.abs(ball.vY)
                block.life--
            }
            //top collision
            if (
                block.y <= ball.y + ball.radius &&
                block.y + block.height >= ball.y + ball.radius &&
                block.x <= ball.x &&
                block.x + block.width >= ball.x
            ) {
                ball.y = block.y - ball.radius
                ball.vY = -Math.abs(ball.vY)
                block.life--
            }
            //left collision
            if (
                block.x <= ball.x + ball.radius &&
                block.x + block.width >= ball.x + ball.radius &&
                block.y <= ball.y &&
                block.y + block.height >= ball.y
            ) {
                ball.x = block.x - ball.radius
                ball.vX = -Math.abs(ball.vX)
                block.life--
            }
            //right collision
            if (
                block.x + block.width >= ball.x - ball.radius &&
                block.x <= ball.x - ball.radius &&
                block.y <= ball.y &&
                block.y + block.height >= ball.y
            ) {
                ball.x = block.x + block.width + ball.radius
                ball.vX = Math.abs(ball.vX)
                block.life--
            }

            block.life === 0 && blocks.splice(blockIndex, 1)
        }
    }
}

const handlePhysics = (platform: Rectangle, blocks: Block[], balls: Ball[]) => {
    handlePlatformCollisions(platform, balls)
    handleBlocksCollisions(blocks, balls)
}

export default handlePhysics
