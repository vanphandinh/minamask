import React from "react"
import styled from "styled-components"
import { rem } from "polished"

import SvgIcon from "../components/SvgIcon"
// import Dropdown from "../components/Dropdown"

/**
 * Types
 */
interface Props {}
interface LinkProps {
  href?: string
  target?: string
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.colors.gray};

  span {
    margin: 0 ${rem(5)};
  }

  a {
    color: inherit;

    &:hover {
      color: ${(props) => props.theme.colors.white};
    }
  }

  @media all and (max-width: 915px) {
    justify-content: center;
    margin-bottom: 10px;
  }
`

const SocialLink = styled.a<LinkProps>`
  margin: 0 ${rem(5)};
`

const Social: React.FC<Props> = () => {
  return (
    <Wrapper>
      <span>
        {"Made with ❤️ by "}
        <a href="https://minagraph.com" target="_blank" rel="noreferrer">
          @BeaconChain (MinaGraph)
        </a>
      </span>
      <SocialLink href="https://twitter.com/BeaconChain" target="_blank" rel="noreferrer">
        <SvgIcon iconKey="twitter" />
      </SocialLink>
      <SocialLink href="https://t.me/c_r_y_p_t_o_c_a_t" target="_blank" rel="noreferrer">
        <SvgIcon iconKey="telegram" />
      </SocialLink>
      {/* <SocialLink href="https://instagram.com/" target="_blank" rel="noreferrer">
        <SvgIcon iconKey="instagram" />
      </SocialLink> */}
      <SocialLink href="https://github.com/vanphandinh" target="_blank" rel="noreferrer">
        <SvgIcon iconKey="github" />
      </SocialLink>
    </Wrapper>
  )
}

export default Social
