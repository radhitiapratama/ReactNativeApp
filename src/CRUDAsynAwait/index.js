import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';

export default function AsynAwaitCrud() {
  const [btnText, setBtnText] = useState('Tambah');
  const [nip, setNip] = useState('');
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [jurusan, setJurusan] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const endPoint = await fetch('http://192.168.1.5:3001/mahasiswa');
    const data = await endPoint.json();
    console.log(data);
    setUsers(data);
  };

  const addData = async () => {
    if (
      nip.length > 0 &&
      nama.length > 0 &&
      email.length > 0 &&
      jurusan.length > 0
    ) {
      const dataUser = {
        nip,
        nama,
        email,
        jurusan,
      };

      if (btnText === 'Tambah') {
        try {
          const endPoint = await fetch(`http://192.168.1.5:3001/mahasiswa`, {
            method: 'POST',
            headers: {
              'Content-Type': 'Application/json',
              Accept: 'Application/json',
            },
            body: JSON.stringify(dataUser),
          });
          const response = await endPoint.json();
          setNip('');
          setNama('');
          setEmail('');
          setJurusan('');
          getData();
          console.log(response);
        } catch (error) {
          console.log(error);
        }
      } else if (btnText === 'Update') {
        try {
          console.log(selectedUser);
          const endPoint = await fetch(
            `http://192.168.1.5:3001/mahasiswa/${selectedUser.id}`,
            {
              method: 'PUT',
              headers: {
                'Content-Type': 'Application/json',
                Accept: 'Application/json',
              },
              body: JSON.stringify(dataUser),
            },
          );
          const response = await endPoint.json();
          console.log(response);
          setNip('');
          setNama('');
          setEmail('');
          setJurusan('');
          setBtnText('Tambah');
          getData();
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      Alert.alert('Error', 'Form pengisian tidak boleh kosong !');
    }
  };

  const updateData = user => {
    setNip(user.nip);
    setNama(user.nama);
    setEmail(user.email);
    setJurusan(user.jurusan);
    setBtnText('Update');
    setSelectedUser(user);
  };

  const deleteData = async user => {
    try {
      const endPoint = await fetch(
        `http://192.168.1.5:3001/mahasiswa/${user.id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'Application/json',
            Accept: 'Application/json',
          },
        },
      );
      const response = await endPoint.json();
      console.log(response);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const batalEdit = () => {
    setBtnText('Tambah');
    setNip('');
    setNama('');
    setEmail('');
    setJurusan('');
  };

  const Card = user => {
    return (
      <View style={styles.cardWrapper}>
        <View style={styles.cardHeader}>
          <TouchableOpacity onPress={user.update}>
            <Image
              style={styles.avatar}
              source={{uri: `https://i.pravatar.cc/150?u=${user.email}`}}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.cardBody}>
          <Text style={styles.cardText}>Nip : {user.nip} </Text>
          <Text style={styles.cardText}>Nama : {user.nama} </Text>
          <Text style={styles.cardText}>Email : {user.email} </Text>
          <Text style={styles.cardText}>Jurusan : {user.jurusan} </Text>
          <TouchableOpacity style={styles.deleteBtn} onPress={user.delete}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 12}}>
              X
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.title}>Data Mahasiswa</Text>
      </View>
      <View>
        <TextInput
          value={nip}
          onChangeText={value => setNip(value)}
          placeholder="Nip"
          style={styles.inputText}></TextInput>
        <TextInput
          value={nama}
          onChangeText={value => setNama(value)}
          placeholder="Nama"
          style={styles.inputText}></TextInput>
        <TextInput
          value={email}
          onChangeText={value => setEmail(value)}
          placeholder="Email"
          style={styles.inputText}></TextInput>
        <TextInput
          value={jurusan}
          onChangeText={value => setJurusan(value)}
          placeholder="Jurusan"
          style={styles.inputText}></TextInput>
        <TouchableOpacity onPress={addData}>
          <Text style={styles.btn}>{btnText}</Text>
        </TouchableOpacity>
        {btnText === 'Update' && (
          <TouchableOpacity onPress={() => batalEdit()}>
            <Text style={styles.btn}>Batal</Text>
          </TouchableOpacity>
        )}
      </View>
      {users.map(user => {
        return (
          <Card
            key={user.id}
            nip={user.nip}
            nama={user.nama}
            email={user.email}
            jurusan={user.jurusan}
            update={() => updateData(user)}
            delete={() => {
              Alert.alert(
                'Peringatan',
                'Apakah anda yakin ingin menghapus data berikut ?',
                [
                  {
                    text: 'Batal',
                  },
                  {
                    text: 'Hapus',
                    onPress: () => deleteData(user),
                  },
                ],
              );
            }}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    width: 200,
    textAlign: 'center',
    paddingVertical: 10,
    backgroundColor: '#478778',
    color: 'white',
    borderRadius: 5,
    marginBottom: 12,
  },
  inputText: {
    borderWidth: 1,
    borderColor: '#505050',
    borderRadius: 100,
    paddingHorizontal: 14,
    marginVertical: 10,
  },
  btn: {
    backgroundColor: '#478778',
    color: '#fff',
    textAlign: 'center',
    paddingVertical: 12,
    fontSize: 17,
    borderRadius: 5,
    marginBottom: 12,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 100,
  },
  cardWrapper: {
    flexDirection: 'row',
    marginVertical: 15,
    position: 'relative',
  },
  cardHeader: {
    width: '30%',
    alignItems: 'center',
  },
  cardBody: {
    width: '70%',
    justifyContent: 'center',
    paddingLeft: 5,
  },
  deleteBtn: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 25,
    height: 25,
    backgroundColor: '#e74c3c',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  cardText: {
    fontSize: 12,
  },
});
