import React, { forwardRef } from "react";
import styled from "styled-components";
import FiberImage from "./FiberImage";

const StyledBanner = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;
`;

const Banner = forwardRef(({ index, ...props }, ref) => {
  return (
    <StyledBanner>
      <FiberImage
        ref={ref}
        src="https://picsum.photos/300/150"
        alt="block"
        index={index}
        {...props}
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
