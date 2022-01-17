import { FormEvent, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import Datepicker from 'react-datepicker';

import closeImg from '../../assets/botao_fechar.svg'

import 'react-datepicker/dist/react-datepicker.css';

import { Container } from './styles';
import { useUsers } from '../../hooks/useUsers';

interface NewUsersModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

interface userProps {
    id: number;
    codigo: string;
    nome: string;
    data_nascimento: string;
    image: string;
}

interface IFormInputs {
    codigo: string;
    nome: string;
}

  const schema = yup
  .object({
      codigo: yup.string().required("Digite um código"),
      nome: yup.string().required("Digite um nome")
  }).required();

export function NewTransactionModal({isOpen, onRequestClose}: NewUsersModalProps) {
    
    const { createUser, updateUser, users, idUser } = useUsers();

    const {
        register,
        handleSubmit,
        setValue,
        resetField,
        formState: { errors },
      } = useForm<IFormInputs>({
        resolver: yupResolver(schema),
      });
    
    const [dataNascimento, setDataNascimento] = useState(new Date('1997-02-12'));

    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState('')
    const [erroImg, setErrorImg] = useState('')

    async function handleCreateNewTransaction(values: IFormInputs) {
        // event.preventDefault();

        const { codigo, nome } = values;
        const { name }: any = selectedFile;
        const dt_nasc = new Intl.DateTimeFormat('pt-BR').format(new Date(dataNascimento));

        if(idUser < 1){
            await createUser({
                codigo,
                nome,
                data_nascimento: dt_nasc,
                image: name,
            });
        }else{
            await updateUser({
                codigo,
                nome,
                data_nascimento: dt_nasc,
                image: name,
            });
        }

        resetField('codigo');
        resetField('nome');
        setDataNascimento(new Date('1997-02-12'));
        setPreview('');

       onRequestClose(); 
    }

    function handleClose(e: FormEvent){
        resetField('codigo');
        resetField('nome');

        setDataNascimento(new Date('1997-02-12'));
        setPreview('');

        onRequestClose();
    }

    useEffect(() => {
        if(idUser !== undefined && idUser != 0){

            const userData = users.find((user: userProps) => user.id == idUser);

            if(userData?.id !== undefined){

                let dt_nasc = Intl.DateTimeFormat('pt-BR').format(
                    new Date(userData.data_nascimento)
                );
                setValue('codigo', userData.codigo);
                setValue('nome', userData.nome);
                setDataNascimento(new Date(dt_nasc));
            }
        }
    }, [idUser]);

    
    useEffect(() => {
        if (!selectedFile) {
            setPreview('')
            return
        }
        
        const { type, size, name } = selectedFile;

        // VALIDA SE É UMA IMAGEM E SEU TIPO
        if(type !== 'image/png' && type !== 'image/jpeg'){
            setPreview('')
            setErrorImg('Insira uma imagem PNG ou JPEG!');
            return
        }

        // VALIDA TAMANHO DA IMAGEM
        const sizeImg = (size / 1024 / 2024);
        if( sizeImg > 2) {
            setPreview('')
            setErrorImg('O tamanho máximo da imagem deve ser de 2MB');
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setErrorImg('');
        setPreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile]);

    function onSelectFile(e: any) {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        setSelectedFile(e.target.files[0])
    }

    return (
        <Modal 
          isOpen={isOpen}
          shouldCloseOnEsc={false}
          onRequestClose={handleClose}
          shouldCloseOnOverlayClick={false}
          overlayClassName='react-modal-overlay'
          className='react-modal-content'
        >
            <button type='button' 
                onClick={handleClose} 
                className='react-modal-close'
            >
                <img src={closeImg} alt="Fechar modal" />
            </button>
            <Container onSubmit={handleSubmit(handleCreateNewTransaction)}>
                <h2>Cadastro de Usuário</h2>

                <input
                    {...register('codigo')}
                    type="text"
                    name='codigo'
                    placeholder='Código'
                />
                <span style={{color: "red"}}>{errors.codigo?.message}</span>

                <input 
                    {...register('nome')}
                    name='nome'
                    placeholder='Nome'
                />
                <span style={{color: "red"}}>{errors.nome?.message}</span>
        
                <Datepicker 
                    name='data_nascimento'
                    className='date-picker'
                    placeholderText='Data de Nascimento'
                    selected={dataNascimento}
                    onChange={(date: Date) => setDataNascimento(date)}
                />
                <span style={{color: "red"}}></span>

                <label htmlFor='image'>{selectedFile ?  <img style={{maxWidth: "200px", maxHeight: "150px"}} src={preview} /> : 'Selecione uma imagem' }</label>
                <input
                    id='image'
                    type='file'
                    name='image'
                    placeholder='Imagem'
                    onChange={(event) => onSelectFile(event)}
                />
                <span style={{color: "red"}}>{erroImg}</span>

                <button type='submit'>Cadastrar</button>

            </Container>
        </Modal>
    )
}