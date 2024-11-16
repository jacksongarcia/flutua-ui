import { WIDTH_SCREEN_MOBILE, WIDTH_COMPONENT_WEB } from './constants/screen';
import 'react-native-reanimated';

import { FCard } from './FCard/index';
import FInput from './FInput';
import { FMenu } from './FMenu';
import FButton from './FButton';
import FModal from './FModal';
import FImage from './FImage'
import FList from './FList'

import useModal from './hooks/modal'
import useMenu from './hooks/menu'
import useScreen from './hooks/screen'

export {
  FInput,
  FMenu,
  FButton,
  FModal,
  FImage,
  FCard,
  FList,

  useModal,
  useMenu,
  useScreen,

  WIDTH_SCREEN_MOBILE,
  WIDTH_COMPONENT_WEB
}
