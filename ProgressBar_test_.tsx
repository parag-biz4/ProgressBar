import { act, fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import ProgressBar from '../index';

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.useFakeTimers();

describe('ProgressBar Snapshot  Test', () => {
    it('ProgressBar Raw Snapshot', () => {
        const component = render(<ProgressBar />);
        expect(component).toMatchSnapshot();
    });
    it('ProgressBar Snapshot', () => {
        const component = render(<ProgressBar visible={true} progress={70} />);
        expect(component).toMatchSnapshot();
    });
});

describe('ProgressBar Functional  Test', () => {
    it('ProgressBar onLayout', async () => {
        const { getByTestId } = render(
            <ProgressBar visible={false} progress={70} />
        );
        const view = getByTestId('progressBarTest');
        act(() => {
            fireEvent(view, 'onLayout', {
                nativeEvent: { layout: { width: 360 } }
            });
        });
    });
});
