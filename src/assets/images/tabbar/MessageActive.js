// import React from 'react';

// import Svg, {Path} from 'react-native-svg';

// const MessageIcon = props => {
//   return (
//     <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.933 21.167">
//       <Path
//         style="color:#000"
//         d="M8.466.793c-.832 0-1.511.679-1.511 1.512v.714c-1.866.623-3.207 2.366-3.207 4.426v3.92l-1 2.084a.265.265 0 0 0 .238.38h3.152v.009c0 1.273 1.046 2.303 2.328 2.303 1.283 0 2.327-1.03 2.327-2.303v-.01h3.152a.265.265 0 0 0 .24-.379l-1-2.084v-3.92c0-2.06-1.342-3.804-3.209-4.426v-.714c0-.833-.677-1.512-1.51-1.512zm-.025.53h.025c.549 0 .98.433.98.982v.571a4.801 4.801 0 0 0-1.962 0v-.571c0-.54.42-.97.957-.983zm.025 1.982c2.328 0 4.19 1.844 4.19 4.14v3.979a.265.265 0 0 0 .025.115l.844 1.76H3.405l.845-1.76a.265.265 0 0 0 .027-.115V7.445c0-2.296 1.862-4.14 4.19-4.14zM6.668 13.828h3.595v.01c0 .986-.795 1.773-1.797 1.773a1.777 1.777 0 0 1-1.798-1.773z"
//       />
//     </Svg>
//   );
// };

// export default MessageIcon;
import React from 'react';
import Svg, { Path } from 'react-native-svg';

const MessageIcon = (props) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 68 64"
      width={47}
      height={50}
      fillRule="nonzero"
    >
      <Path
        d="M25,0c-2.20703,0 -4,1.79297 -4,4c0,2.20703 1.79297,4 4,4c2.20703,0 4,-1.79297 4,-4c0,-2.20703 -1.79297,-4 -4,-4zM19.375,6.09375c-4.57031,1.95703 -7.375,6.36328 -7.375,11.90625c0,11 -3.80078,13.76172 -6.0625,15.40625c-1.00391,0.72656 -1.9375,1.40234 -1.9375,2.59375c0,4.20703 6.28125,6 21,6c14.71875,0 21,-1.79297 21,-6c0,-1.19141 -0.93359,-1.86719 -1.9375,-2.59375c-2.26172,-1.64453 -6.0625,-4.40625 -6.0625,-15.40625c0,-5.55859 -2.80078,-9.95312 -7.375,-11.90625c-0.85547,2.27344 -3.05859,3.90625 -5.625,3.90625c-2.56641,0 -4.76953,-1.63672 -5.625,-3.90625zM19,43.875c0,0.03906 0,0.08594 0,0.125c0,3.30859 2.69141,6 6,6c3.30859,0 6,-2.69141 6,-6c0,-0.03906 0,-0.08594 0,-0.125c-1.88281,0.07813 -3.88281,0.125 -6,0.125c-2.11719,0 -4.11719,-0.04687 -6,-0.125z"
        fill="#007fff"
        stroke="#007fff"
        strokeWidth={0.25}
      />
    </Svg>
  );
};

export default MessageIcon;

    

