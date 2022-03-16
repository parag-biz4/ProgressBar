import * as React from 'react';
import { Animated, Easing, StyleProp, View, ViewStyle } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import { useTheme } from '../../../Core/Provider';

type Props = React.ComponentPropsWithRef<typeof View> & {
    radius?: number;
    /**
     * Progress value.
     */
    progress?: number;

    /**
     * Max Progress value
     */
    maxProgress?: number;

    /**
     * Size of Progressbar
     */
    size?: 'small' | 'large';

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

const CircularProgressIndicator = ({
    color,
    style,
    progress = 0,
    visible = true,
    theme: propsTheme,
    maxProgress = 100,
    size = 'small',
    radius = size == 'small' ? 20 : 34,
    ...rest
}: Props) => {
    const { theme: hookTheme } = useTheme();
    const theme = propsTheme ?? hookTheme;
    const strokeWidth = size == 'small' ? 4 : 8;
    const animated = React.useRef<Animated.Value>(
        new Animated.Value(0)
    ).current;
    const circleRef = React.useRef() as React.MutableRefObject<View>;
    const circumference = 2 * Math.PI * radius;
    const halfCircle = radius + strokeWidth;
    const tintColor = color || theme?.colors?.PRIMARY[500];
    const trackTintColor = theme?.colors?.NEUTRAL[200];

    const startAnimation = React.useCallback(() => {
        Animated.timing(animated, {
            toValue: progress,
            duration: 300 * theme?.animation?.scale,
            useNativeDriver: true,
            easing: Easing.out(Easing.ease)
        }).start();
        const maxPercentage = (100 * progress) / maxProgress;
        const strokeDashoffset =
            circumference - (circumference * maxPercentage) / 100;
        if (circleRef?.current) {
            circleRef.current.setNativeProps({
                strokeDashoffset
            });
        }
    }, [progress, maxProgress]);

    const stopAnimation = React.useCallback(() => {
        Animated.timing(animated, {
            duration: 200 * theme?.animation?.scale,
            toValue: 0,
            useNativeDriver: true,
            isInteraction: false
        }).start();
    }, [animated, theme?.animation?.scale]);

    React.useEffect(() => {
        if (visible) startAnimation();
        else stopAnimation();
    }, [visible, startAnimation, stopAnimation]);

    return (
        <View
            style={[{ width: radius * 2, height: radius * 2 }, style]}
            {...rest}
        >
            <Svg
                height={radius * 2}
                width={radius * 2}
                viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
            >
                <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
                    <Circle
                        cx="50%"
                        cy="50%"
                        r={radius}
                        fill="transparent"
                        stroke={trackTintColor}
                        strokeWidth={strokeWidth}
                        strokeLinejoin="round"
                    />
                    <Circle
                        ref={circleRef}
                        cx="50%"
                        cy="50%"
                        r={radius}
                        fill="transparent"
                        stroke={tintColor}
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        strokeDashoffset={circumference}
                        strokeDasharray={circumference}
                    />
                </G>
            </Svg>
        </View>
    );
};

export default CircularProgressIndicator;
