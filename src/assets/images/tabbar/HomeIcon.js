import React from 'react';


import Svg , {Path,G} from 'react-native-svg';

const HomeIcon = (props) =>{

    return(
      <Svg
      width={30}
      height={50}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        opacity={0.6}
        d="M26.69 9.739 14.828.185a.838.838 0 0 0-1.034-.012L1.325 9.726a.83.83 0 0 0 .51 1.493.833.833 0 0 0 .51-.172L4.24 9.595v10.67a2.539 2.539 0 0 0 2.54 2.532H21.22a2.539 2.539 0 0 0 2.54-2.532V9.521l1.88 1.513c.358.29.885.234 1.175-.124a.83.83 0 0 0-.124-1.171Zm-4.602-1.34v11.866c0 .478-.39.867-.87.867H6.782a.869.869 0 0 1-.87-.867V8.398a.847.847 0 0 0-.003-.081l8.382-6.424 7.825 6.303a.814.814 0 0 0-.027.202ZM9.055 17.376h5.883c.462 0 .836.373.836.833 0 .46-.374.833-.836.833H9.055a.834.834 0 0 1-.836-.833c0-.46.375-.833.836-.833Zm7.463.833c0-.46.374-.833.836-.833h1.591c.462 0 .836.373.836.833 0 .46-.374.833-.836.833h-1.591a.834.834 0 0 1-.836-.833Z"
        fill="#000"
      />
      <Path
        d="M6.29 39h-.943v-3.286H1.763V39H.825v-7.11h.938v3.057h3.584v-3.056h.942V39Zm1.283-2.69c0-.518.101-.983.303-1.397.205-.413.488-.732.85-.957.364-.225.78-.337 1.245-.337.72 0 1.3.25 1.743.747.446.498.669 1.16.669 1.987v.064c0 .514-.1.977-.298 1.387a2.226 2.226 0 0 1-.845.952 2.327 2.327 0 0 1-1.26.342c-.716 0-1.297-.25-1.743-.747-.442-.498-.664-1.158-.664-1.978v-.063Zm.908.107c0 .586.136 1.056.406 1.411.273.355.638.532 1.093.532.46 0 .824-.179 1.094-.537.27-.361.405-.866.405-1.513 0-.58-.138-1.049-.414-1.407a1.303 1.303 0 0 0-1.094-.542c-.446 0-.806.178-1.08.533-.273.354-.41.862-.41 1.523Zm5.884-2.7.025.586c.387-.456.91-.684 1.567-.684.739 0 1.242.283 1.509.85.176-.254.403-.46.683-.616a2.04 2.04 0 0 1 1.001-.234c1.16 0 1.748.614 1.768 1.841V39h-.903v-3.486c0-.378-.087-.66-.26-.845-.172-.189-.461-.283-.868-.283-.336 0-.614.1-.835.302-.222.199-.35.468-.386.806V39h-.908v-3.462c0-.768-.376-1.152-1.128-1.152-.593 0-.998.252-1.216.757V39h-.903v-5.283h.854Zm10.112 5.38c-.716 0-1.298-.234-1.747-.703-.45-.471-.674-1.101-.674-1.89v-.165c0-.524.099-.991.297-1.401.202-.414.482-.736.84-.967a2.112 2.112 0 0 1 1.172-.352c.687 0 1.22.226 1.602.679.38.452.571 1.1.571 1.943v.376H22.96c.013.521.164.943.454 1.265.293.319.664.478 1.113.478.32 0 .59-.065.81-.195.222-.13.416-.303.582-.517l.552.43c-.443.68-1.107 1.02-1.992 1.02Zm-.112-4.736c-.364 0-.67.134-.918.4-.247.264-.4.636-.459 1.114h2.647v-.068c-.026-.46-.15-.814-.371-1.065-.222-.254-.521-.38-.899-.38Z"
        fill="#333"
      />
    </Svg>

    )
}; 

export default HomeIcon;

