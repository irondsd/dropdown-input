import React, { Component } from 'react'
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import IconAnt from 'react-native-vector-icons/dist/AntDesign'

const ref_input = React.createRef()
const max_lines = 5

export default class DropDownInput extends Component {
    state = {
        text: '',
        droppedDown: false,
        refinedList: [],
    }

    componentDidMount() {
        this.setState({
            droppedDown: this.props.open,
            refinedList: this.props.list,
        })
    }

    onSubmitEditing = () => {
        let value = this.state.refinedList[0]
        console.log(value)
        this.setState({ text: value, droppedDown: false })
    }

    clear = () => {
        this.onChangeText('')
        this.refineList('')
    }

    refineList = value => {
        let list = this.props.list
        list = list.filter(e => {
            return e.includes(value)
        })
        this.setState({ refinedList: list })
    }

    onChangeText = value => {
        this.refineList(value)
        this.setState({
            text: value,
            droppedDown: true,
        })

        this.props.onChangeText(value)
    }

    dropDown = () => {
        this.setState({
            droppedDown: !this.state.droppedDown,
        })
        ref_input.current.focus()
    }

    popUpRender = () => {
        let array = this.state.refinedList
        return [
            array.map((el, index) => {
                return (
                    <TouchableOpacity
                        onPress={() => {
                            console.log(el)
                            this.onChangeText(el)
                            this.setState({ droppedDown: false })
                        }}
                        key={index}>
                        <Text style={styles.popUpText}>{el}</Text>
                    </TouchableOpacity>
                )
            }),
        ]
    }

    render() {
        let popUpHeight = 200

        if (this.state.refinedList.length < 5)
            popUpHeight = this.state.refinedList.length * 40

        return (
            <View style={styles.View}>
                <TextInput
                    onSubmitEditing={this.onSubmitEditing}
                    style={styles.input}
                    placeholder={this.props.placeholder}
                    value={this.state.text}
                    onChangeText={this.onChangeText}
                    ref={ref_input}
                />
                <Icon
                    style={styles.iconDown}
                    name={this.state.droppedDown ? 'angle-up' : 'angle-down'}
                    size={30}
                    onPress={this.dropDown}
                    color={this.state.droppedDown ? '#aaa' : '#ddd'}
                />
                {this.state.text !== '' && (
                    <IconAnt
                        style={styles.iconClear}
                        name="close"
                        size={22.5}
                        onPress={this.clear}
                        color={'#ddd'}
                    />
                )}
                {this.state.droppedDown && (
                    <ScrollView style={[styles.popUp, { height: popUpHeight }]}>
                        {this.popUpRender()}
                    </ScrollView>
                )}
            </View>
        )
    }
}

var styles = StyleSheet.create({
    View: {
        // backgroundColor: 'white',
        width: '100%',
    },
    input: {
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        fontSize: 17,
        paddingLeft: 15,
        paddingRight: 15,
        height: 50,
        backgroundColor: 'white',
    },
    iconDown: {
        position: 'absolute',
        right: 0,
        top: 10,
        height: 50,
        width: 30,
    },
    iconClear: {
        position: 'absolute',
        right: 35,
        top: 15,
        height: 50,
        width: 30,
    },
    popUp: {
        position: 'absolute',
        zIndex: 10,
        top: 49,
        bottom: 0,
        width: '100%',
        height: 200,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: 'white',
    },
    popUpText: {
        fontSize: 17,
        lineHeight: 40,
        color: '#888',
    },
})
