import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Keyboard,
} from 'react-native';

export default class App extends Component {
  state = {
    loading: false,
    cep: '',
    dados: {
      logradouro: '',
      uf: '',
      bairro: '',
      localidade: '',
    },
  };

  buscarCep = () => {
    this.setState({
      loading: true,
      cep: '',
      dados: {
        logradouro: '',
        uf: '',
        bairro: '',
        localidade: '',
      },
    });

    fetch(`https://viacep.com.br/ws/${this.state.cep}/json/`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          loading: false,
          dados: data,
        });
      })
      .catch(err => {
        this.setState({
          loading: false,
        });
      })
      .finally(() => {
        Keyboard.dismiss();
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.centro}>
          <Image
            style={styles.logo}
            source={{
              uri: 'https://logodownload.org/wp-content/uploads/2014/05/correios-logo-1-1.png',
            }}
          />
        </View>
        <Text style={styles.text}>Buscar meu CEP</Text>
        <View style={styles.inputButton}>
          <TextInput
            value={this.state.cep}
            onChangeText={cep => {
              this.setState({cep});
            }}
            style={styles.input}
            placeholder="Digite seu CEP (apenas números)"
            placeholderTextColor="#c3c3c3"
            keyboardType="numeric"
          />

          <TouchableOpacity
            style={styles.button}
            onPress={this.buscarCep}
            disabled={this.state.loading ? true : false}>
            <Image
              style={styles.txtButton}
              source={{
                uri: 'https://www.udop.com.br/u_img/buscar/lupa.png',
              }}
            />
          </TouchableOpacity>
        </View>

        {this.state.dados.localidade ? (
          <View style={styles.informacao_box}>
            <Text style={styles.tituloInformacao}>Estado:</Text>
            <Text style={styles.informacao}>{this.state.dados.uf}</Text>
            <View style={styles.linha} />

            <Text style={styles.tituloInformacao}>Cidade:</Text>
            <Text style={styles.informacao}>{this.state.dados.localidade}</Text>
            <View style={styles.linha} />

            <Text style={styles.tituloInformacao}>Bairro:</Text>
            <Text style={styles.informacao}>{this.state.dados.bairro}</Text>
            <View style={styles.linha} />

            <Text style={styles.tituloInformacao}>Logradouro:</Text>
            <Text style={styles.informacao}>
              <View style={styles.linha} />
              {this.state.dados.logradouro}
            </Text>
            <View style={styles.linha} />
          </View>
        ) : this.state.loading ? (
          <View style={styles.indicator}>
            <ActivityIndicator size="large" />
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 120,
    marginHorizontal: 20,
  },
  logo: {
    width: 250,
    height: 100,
    resizeMode: 'contain',
    margin: 20,
  },
  centro: {
    alignItems: 'center',
    marginBottom: 40,
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
  },
  input: {
    marginTop: 20,
    borderWidth: 0.7,
    borderColor: '#c3c3c3',
    paddingHorizontal: 20,
    paddingVertical: 15,
    width: '85%',
  },
  button: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#064169',
    paddingHorizontal: 20,
    paddingVertical: 15,
    width: '15%',
    alignSelf: 'center',
  },
  txtButton: {
    width: 25,
    height: 25,
  },
  inputButton: {
    flexDirection: 'row',
  },
  informacao_box: {
    marginTop: 50,
  },
  tituloInformacao: {
    fontSize: 15,
    marginRight: 15,
    marginLeft: 15,
  },
  informacao: {
    fontSize: 20,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
  },
  linha: {
    height: 1,
    backgroundColor: '#cecece',
    marginBottom: 15,
  },
  indicator: {
    marginTop: 40,
  },
});
