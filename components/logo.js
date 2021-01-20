import *as React from 'react';
import LottieView from 'lottie-react-native';

export default class Santalogo extends React.Component {
    render() {
        return (
            <LottieView source={require('../assets/logo.json')}
                style={{ width: '50%' }}
                autoPlay loop />

        )
    }
}