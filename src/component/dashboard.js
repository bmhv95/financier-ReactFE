import authService from "../service/auth.service"

export default function Dashboard(){
    return (
        <div>
            <h2>Dashboard</h2>
            <p>{JSON.stringify(authService.getCurrentUser())}</p>
        </div>
    )
}