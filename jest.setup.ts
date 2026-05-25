import 'react-native-gesture-handler/jestSetup'
import { setUpTests } from 'react-native-reanimated'

setUpTests()

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')
