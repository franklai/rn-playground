import React from 'react';
import { Text, View } from 'react-native';
import Gallery from 'react-native-image-gallery';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      images: [],
    };

    setTimeout(() => this.addImages(1), 10);
  }

  addImages(count) {
    console.log('addImages called, count:', count);

    const rnd = '6B9C70D63C9D11DFA0D46B6255D89593';
    const prefix = 'http://www.beyondplaza.com.tw/ViewDM/';
    const suffix = '/files/assets/flash/pages/';
    const dm_id = '746050656731471742';
    const dm_length = 24;
    // const dm_length = 3;

    if (count > dm_length) {
      return;
    }

    const imgs = Array.from(
      {length: dm_length},
      (val, idx) => {
        const num_string = `${idx + 1}`.padStart(4, '0');
        const file_name = `page${num_string}_l.png`;
        return {source: {uri: `${prefix}${dm_id}${suffix}${file_name}?rnd=${rnd}` }};
      },
    );

    this.setState({images: imgs});

    setTimeout(() => this.addImages(count + 1), 3500);
  }

  onChangeImage (index) {
    this.setState({ index });
  }

  get caption () {
    const { images, index } = this.state;
    const captionStyle = {
      position: 'absolute',
      width: '100%',
      bottom: 0,
      paddingBottom: 10,
      backgroundColor: 'skyblue',
    };
    return (
      <View style={{}}>
        <Text>{index + 1} / {images.length}</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={{flex: 1}}>
      <Gallery
        style={{flex: 1, backgroundColor: 'grey'}}
        initialPage={0}
        images={this.state.images}
        onPageSelected={this.onChangeImage.bind(this)}
      />
      { this.caption }
      </View>
    );
  }
}
