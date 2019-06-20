import React from "react";
import SvgIcon from '@material-ui/core/SvgIcon';


const RecreationSvg = props => (
    <SvgIcon
        height={512}
        width={512}
        viewBox="0 0 512 512"
        key="rec"
        id="rec"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        {...props}
    >
        <defs>
            <g id="rec_e">
                <defs>
                    <path id="rec_a" d="M25.967 123.031h428.066v343.755H25.967V123.031z" />
                    <image
                        width={1249}
                        height={1003}
                        id="rec_c"
                        transform="scale(.0008 .001)"
                    />
                    <clipPath id="rec_b">
                        <use xlinkHref="#rec_a" />
                    </clipPath>
                    <g id="rec_d" clipPath="url(#rec_b)">
                        <use
                            xlinkHref="#rec_c"
                            transform="matrix(428.066 0 0 343.755 25.967 123.031)"
                        />
                    </g>
                </defs>
                <use xlinkHref="#rec_d" fill="#a9a9a9" fillRule="evenodd" />
            </g>
        </defs>
        <use xlinkHref="#rec_e" />
    </SvgIcon>
);

export default RecreationSvg;