import { Laser, LaserMeta } from "./types"

import one from "../static/1.png"
import two from "../static/2.png"
import three from "../static/3.png"
import four from "../static/4.png"
import five from "../static/5.png"
import six from "../static/6.png"

export const LASERS = new Map<Laser, LaserMeta>([
  [Laser.One, { src: one, name: "one" }],
  [Laser.Two, { src: two, name: "two" }],
  [Laser.Three, { src: three, name: "three" }],
  [Laser.Four, { src: four, name: "four" }],
  [Laser.Five, { src: five, name: "five" }],
  [Laser.Six, { src: six, name: "six" }],
])

export const STAGE_CONFIG = {
  width: 540,
  height: 415,
}

export const LASER_SIZE = 100
export const SCALE_FACTOR = 2
