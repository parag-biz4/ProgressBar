import * as React from 'react';
import { Animated, StyleProp, View, ViewStyle } from 'react-native';
import { useTheme } from '../../../Core/Provider';
import styles from './style';

type Props = React.ComponentPropsWithRef<typeof View> & {
    /**
     * Progress value (between 0 and maxProgress).
     */
    progress?: number;

    /**
     * Max Progress value, default=100
     */
    maxProgress?: number;

    /**
     * Color of the progress bar. The background color can be changed by passing `backgroundColor` to `style` prop.
     */
    color?: string;

    /**
     * Whether to show the ProgressBar (true, the default) or hide it (false).
     */
    visible?: boolean;

    /**
     * Style Progressbar.
     */
    style?: StyleProp<ViewStyle>;

    /**
     * Custom Theme
     */
    theme?: ThemedUIComponents.Theme;
};

const BarProgressIndicator = ({
    color,
    style,
    progress = 0,
    visible = true,
    theme: propsTheme,
    maxProgress = 100,
    ...rest
}: Props) => {
    const [width, setWidth] = React.useState<number>(0);
    const animatedValue = React.useRef(new Animated.Value(-1000)).current;
    const reactive = React.useRef(new Animated.Value(-1000)).current;
    const { theme: hookTheme } = useTheme();
    const theme = propsTheme ?? hookTheme;
    const tintColor = color || theme?.colors?.PRIMARY[500];
    const trackTintColor = theme?.colors?.NEUTRAL[200];

    const startAnimation = React.useCallback(() => {
        Animated.timing(animatedValue, {
            toValue: reactive,
            duration: 300 * theme?.animation?.scale,
            useNativeDriver: true
        }).start();
        reactive.setValue(-width + (width * progress) / maxProgress);
    }, [progress, maxProgress, width]);

    const stopAnimation = React.useCallback(() => {
        Animated.timing(animatedValue, {
            duration: 200 * theme?.animation?.scale,
            toValue: 0,
            useNativeDriver: true,
            isInteraction: false
        }).start();
    }, [animatedValue, theme?.animation?.scale]);

    React.useEffect(() => {
        if (visible) startAnimation();
        else stopAnimation();
    }, [visible, startAnimation, stopAnimation]);
    return (
        <View
            onLayout={e => {
                const newWidth = e.nativeEvent.layout.width;
                setWidth(newWidth);
            }}
            {...rest}
            style={[
                styles.container,
                {
                    backgroundColor: trackTintColor
                },
                style
            ]}
            testID="progressBarTest"
        >
            <Animated.View
                style={[
                    styles.progressBar,
                    {
                        backgroundColor: tintColor,
                        transform: [
                            {
                                translateX: animatedValue
                            }
                        ]
                    }
                ]}
            ></Animated.View>
        </View>
    );
};

export default BarProgressIndicator;

import { StyleSheet } from 'react-native';
import { SPACING } from '../../../Foundation/Constants';
const styles = StyleSheet.create({
    container: {
        height: SPACING?.X_SM,
        borderRadius: SPACING?.X_SM,
        overflow: 'hidden'
    },

    progressBar: {
        height: SPACING?.X_SM,
        borderRadius: SPACING?.X_SM,
        width: '100%',
        position: 'absolute',
        left: 0,
        top: 0
    }
});
export default styles;

