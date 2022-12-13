import styles from '../../styles/style.module.scss'
import BasicTable from '../../components/BasicTable'
import getRawBody from 'raw-body';
import Image from 'next/image';
import IMG from '../../public/IC1396_Miller_960.jpg'
export const getServerSideProps = async ({req}) => {
    const newBody = await getRawBody(req)
    const body = JSON.parse(newBody.toString("utf-8"))
    // const body ={
    //     img:IMG,
    //     name:"stephan hameleh",
    //     age:"34",
    //     address:"21 yehuda hayamit"
    // }
    return {props: {body}};
}

export default function GetPokes(props) {
    const {name, age, address, img} = props.body
    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <img alt='srccc' src={img}/>
                <div>
                    <p>{name}</p>
                    <p>{age}</p>
                    <p>{address}</p>
                </div>
                <BasicTable/>
            </div>
        </div>
    )
}
