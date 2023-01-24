import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';

export default function Crud() {
  const [nip, setNip] = useState('');
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [jurusan, setJurusan] = useState('');
  const [users, setUsers] = useState([]);
  const [textButton, setTextButton] = useState('Tambah');
  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    getMahasiswa();
  }, []);

  const createMahasiswa = () => {
    const data = {
      nip,
      nama,
      email,
      jurusan,
    };

    if (
      data.nip.length > 0 &&
      data.nama.length > 0 &&
      data.email.length > 0 &&
      data.jurusan.length > 0
    ) {
      if (textButton === 'Tambah') {
        fetch('http://192.168.1.5:3001/mahasiswa', {
          method: 'POST',
          headers: {
            'Content-Type': 'Application/json',
            Accept: 'Application/json',
          },
          body: JSON.stringify(data),
        })
          .then(response => response.json())
          .then(response => console.log(response));

        setNip('');
        setNama('');
        setEmail('');
        setJurusan('');
        getMahasiswa();
      } else if (textButton === 'Update') {
        console.log(data);
        console.log(selectedUser);
        fetch(`http://192.168.1.5:3001/mahasiswa/${selectedUser.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'Application/json',
            Accept: 'Application/json',
          },
          body: JSON.stringify(data),
        })
          .then(response => response.json())
          .then(response => {
            setNip('');
            setNama('');
            setEmail('');
            setJurusan('');
            setTextButton('Tambah');
            getMahasiswa();
            console.log(response);
            Alert.alert('Success', 'Data Mahasiswa berhasil di update');
          });
      }
    } else {
      Alert.alert('Error', 'Form Pengisian tidak boleh kosong');
    }
  };

  const getMahasiswa = () => {
    fetch('http://192.168.1.5:3001/mahasiswa')
      .then(response => response.json())
      .then(response => {
        console.log(response);
        setUsers(response);
        console.log(users);
      });
  };

  const onUpdate = props => {
    setNip(props.nip);
    setNama(props.nama);
    setEmail(props.email);
    setJurusan(props.jurusan);
    setTextButton('Update');
    setSelectedUser(props);
  };

  const deleteMahasiswa = props => {
    fetch(`http://192.168.1.5:3001/mahasiswa/${props.id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(response => {
        getMahasiswa();
      });
  };

  const Card = props => {
    return (
      <View style={styles.cardWrapper}>
        <View style={styles.cardHeader}>
          <TouchableOpacity onPress={props.onUpdate}>
            <Image
              source={{uri: `https://i.pravatar.cc/150?u=${props.email}`}}
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.cardBody}>
          <Text>Nip : {props.nip} </Text>
          <Text>Nama : {props.nama}</Text>
          <Text>Email : {props.email}</Text>
          <Text>Jurusan : {props.jurusan}</Text>
          <TouchableOpacity
            style={styles.deleteBtnWrapper}
            onPress={props.onDelete}>
            <Text style={styles.deleteBtn}>X</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <ScrollView>
      <View>
        <Text style={styles.title}>CRUD Mahasiswa</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Nip"
            style={styles.input}
            value={nip}
            onChangeText={value => setNip(value)}></TextInput>

          <TextInput
            placeholder="Nama"
            style={styles.input}
            value={nama}
            onChangeText={value => setNama(value)}></TextInput>

          <TextInput
            placeholder="Email"
            style={styles.input}
            value={email}
            onChangeText={value => setEmail(value)}></TextInput>

          <TextInput
            placeholder="Jurusan"
            style={styles.input}
            value={jurusan}
            onChangeText={value => setJurusan(value)}></TextInput>

          <Button title={textButton} onPress={createMahasiswa} />
          {users.map(users => {
            return (
              <Card
                key={users.id}
                nip={users.nip}
                nama={users.nama}
                email={users.email}
                onUpdate={() => onUpdate(users)}
                jurusan={users.jurusan}
                onDelete={() => {
                  Alert.alert(
                    'Peringatan',
                    'Apakah anda yakin ingin menghapus data berikut?',
                    [
                      {
                        text: 'Batal',
                        onPress: () => console.log('batal'),
                      },
                      {
                        text: 'Iya',
                        onPress: () => deleteMahasiswa(users),
                      },
                    ],
                  );
                }}
              />
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#505050',
    borderRadius: 50,
    paddingHorizontal: 24,
    paddingVertical: 5,
    marginBottom: 12,
  },
  inputWrapper: {
    marginVertical: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: '#505050',
    borderRadius: 100,
  },
  cardWrapper: {
    flexDirection: 'row',
    padding: 12,
    position: 'relative',
  },
  cardHeader: {
    width: '30%',
    alignItems: 'center',
  },
  cardBody: {
    paddingHorizontal: 12,
    width: '70%',
  },
  deleteBtnWrapper: {
    position: 'absolute',
    right: 0,
    top: 5,
    width: 24,
    height: 24,
    alignItems: 'center',
  },
  deleteBtn: {
    color: 'red',
    fontWeight: 'bold',
  },
});
