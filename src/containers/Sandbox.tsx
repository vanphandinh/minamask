import React, { useRef, useEffect } from "react"
import { values, isNil } from "ramda"
import { Stage, Layer } from "react-konva"
import { rem } from "polished"
import { IPoint } from "face-api.js"
import styled from "styled-components"

import { models, detect, download } from "../helpers/utils"
import { useSetState } from "../helpers/hooks"

import { Laser } from "../helpers/types"
import { LASERS, LASER_SIZE, STAGE_CONFIG } from "../helpers/const"

import Figure from "../components/Figure"
import Button from "../components/Button"
import SvgIcon from "../components/SvgIcon"

/**
 * Types
 */
interface Props {
  laser?: Laser
  portrait?: string
}

interface WrapperProps {
  preview?: string
}

const Wrapper = styled.div<WrapperProps>`
  position: relative;
  border-radius: ${rem(24)};
  background-color: ${(props) => props.theme.colors.black};
  background-image: ${(props) => `url(${props.preview})` || "none"};
  background-size: cover;
  background-position: center;
  overflow: hidden;
  width: 100%;
  height: 100%;
  transform: translate3d(0, 0, 0);

  &:before {
    content: "";
    pointer-events: none;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(18px);
  }

  .stage {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .konvajs-content {
    min-width: 540px;
    min-height: 415px;

    @media all and (min-width: 1025px) {
      width: 100% !important;
      height: 100% !important;
    }

    @media all and (max-width: 580px) {
      width: 280px !important;
      height: 280px !important;
      min-width: 0;
      min-height: 0;
    }

    canvas {
      width: 100% !important;
      height: 100% !important;
      object-fit: cover;
    }
  }
`

const Actions = styled.div`
  position: absolute;
  right: ${rem(28)};
  left: ${rem(28)};
  bottom: ${rem(28)};
  display: flex;
  align-items: center;
  justify-content: flex-end;

  ${Button} {
    background-color: ${(props) => props.theme.colors.white};
    padding: ${rem(10)} ${rem(18)};
    font-size: ${rem(16)};
    height: ${rem(44)};

    &:active {
      background-color: ${(props) => props.theme.colors.dark};
      color: ${(props) => props.theme.colors.white};
    }
  }

  @media all and (max-width: 580px) {
    left: 12px;
    bottom: 12px;
    right: 12px;

    ${Button} {
      height: 36px;
      font-size: 14px;
      line-height: normal;
      width: auto;

      span,
      i {
        line-height: normal;
      }
    }
  }
`

const ButtonGroup = styled.div`
  ${Button} {
    padding: ${rem(10)} ${rem(12)};

    &:first-child {
      border-radius: ${rem(16)} 0 0 ${rem(16)};
    }

    &:last-child {
      border-radius: 0 ${rem(16)} ${rem(16)} 0;
      border-left: 1px solid ${(props) => props.theme.colors.dark};
    }

    &:hover {
      span {
        max-width: 300px;
        opacity: 1;
        margin-left: ${rem(10)};
      }
    }

    i {
      font-size: ${rem(24)};
      margin-right: 0;
      margin-left: 0;
      transition: color ${(props) => props.theme.transition.base};
    }

    span {
      max-width: 0;
      opacity: 0;
      display: inline-block;
      overflow: hidden;
      transition: all ${(props) => props.theme.transition.base} 0.1s;
    }

    @media all and (max-width: 580px) {
      padding-left: 12px;
      padding-right: 12px;

      span {
        display: none;
      }
    }
  }
`

const Sandbox: React.FC<Props> = ({ laser = Laser.One, portrait }: Props) => {
  const [state, setState] = useSetState<{ [key: string]: IPoint | undefined }>({
    left: { x: 130, y: 90 },
    right: { x: 190, y: 84 },
  })

  const stageRef = useRef(null)
  const lasers = values(state)
  const src = LASERS?.get(laser)?.src

  const faceLandmarks = async () => {
    try {
      setState(await detect())
    } catch (error) {}
  }

  useEffect(() => {
    models()
  }, [])

  useEffect(() => {
    if (portrait) {
      setTimeout(faceLandmarks, 500)
    }
    // eslint-disable-next-line
  }, [portrait])

  const onExport = () => {
    if (stageRef?.current) {
      // @ts-expect-error
      download(stageRef.current.toDataURL(), "crypto-laser-eyes.png")
    }
  }

  return (
    <>
      <Wrapper preview={portrait}>
        <Stage className="stage" {...STAGE_CONFIG} ref={stageRef}>
          <Layer>
            <Figure scaled src={portrait || "images/default.jpg"} />

            {lasers.map((laser) => {
              if (isNil(laser)) {
                return null
              }
              return (
                <Figure
                  draggable
                  src={src}
                  key={laser?.x}
                  x={laser?.x}
                  y={laser?.y}
                  width={LASER_SIZE}
                  height={LASER_SIZE}
                />
              )
            })}
          </Layer>
        </Stage>

        {portrait ? (
          <Actions>
            <ButtonGroup>
              <Button
                as="a"
                target="_blank"
                rel="noreferrer"
                href="https://twitter.com/intent/tweet?text=Welcome%2C+the+%40MinaProtocol+Mainnet%21%0D%0A%0D%0ALet%27s+join+the+revolution%2C+be+a+part+of+the+Mina+community+and+update+your+avatar+today.&url=https%3A%2F%2Fmask.minagraph.com&hashtags=MinaMask,MinaMainnet,PoweredByParticipants"
              >
                <SvgIcon iconKey="share" />
                <span>Share</span>
              </Button>
              <Button type="button" onClick={onExport}>
                <SvgIcon iconKey="download" />
                <span>Download</span>
              </Button>
            </ButtonGroup>
          </Actions>
        ) : null}
      </Wrapper>
    </>
  )
}

export default Sandbox
