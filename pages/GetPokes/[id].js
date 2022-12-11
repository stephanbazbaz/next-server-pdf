import styles from '../../styles/style.module.scss'
import AddAlarmIcon from '@mui/icons-material/AddAlarm';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import BasicTable from '../../components/BasicTable'
export default function GetPokes(props) {
    const {character} = props
    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <h1>poke</h1>
                <div>
                    <AddAlarmIcon/>
                    <AddAPhotoIcon/>
                    <AccessibilityIcon/>
                </div>

                <div>{character.growth_time}</div>
                <div>{character.name}</div>
                <div>{character.item.url}</div>
                <div className={styles.row}></div>
                <BasicTable/>
            </div>
        </div>
    )
}

export const getServerSideProps = async (context) => {
    const {id} = context.params
    const character = await fetch(`https://pokeapi.co/api/v2/berry/${id}`)
        .then(res => res.json());
    return {props: {character}};
};
