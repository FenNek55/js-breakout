import type { Rectangle, Ball } from './types'

const handlePhysics = (platform: Rectangle, balls: Ball[]) => {
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

export default handlePhysics
