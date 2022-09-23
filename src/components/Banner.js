import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const StyledBanner = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;
  img {
    width: 200%;
  }
`;

const Banner = React.forwardRef((props, ref) => {
  return (
    <StyledBanner>
      <img
        style={{ opacity: 1 }}
        ref={ref}
        src="https://picsum.photos/300/150"
        alt="block"
      />
      <div>
        <h1>Lorem Ipsum</h1>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s.
        </p>
      </div>
    </StyledBanner>
  );
});

export default Banner;
