import { render } from '@testing-library/react-native';
import React from 'react';
import CircularProgressIndicator from '../index';

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.useFakeTimers();
describe('Circular Progress Indicator Snapshot  Test', () => {
    it('Simple Circular Progress Indicator Snapshot', () => {
        const component = render(<CircularProgressIndicator />);
        expect(component).toMatchSnapshot();
    });
    it('Small Circular Progress Indicator Snapshot', () => {
        const component = render(
            <CircularProgressIndicator
                visible={true}
                progress={10}
                size="small"
            />
        );
        expect(component).toMatchSnapshot();
    });
    it('Large Circular Progress Indicator Snapshot', () => {
        const component = render(
            <CircularProgressIndicator
                visible={true}
                progress={30}
                size="large"
            />
        );
        expect(component).toMatchSnapshot();
    });
    it('Custom Radius Circular Progress Indicator Snapshot', () => {
        const component = render(
            <CircularProgressIndicator
                visible={true}
                progress={30}
                radius={40}
            />
        );
        expect(component).toMatchSnapshot();
    });
    it('False Visibility Circular Progress Indicator Snapshot', () => {
        const component = render(
            <CircularProgressIndicator
                visible={false}
                progress={30}
                radius={40}
            />
        );
        expect(component).toMatchSnapshot();
    });
});
