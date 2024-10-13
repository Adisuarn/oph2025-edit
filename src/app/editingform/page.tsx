
import Link from 'next/link'

export default function EditingForm(){
    return (
        <div>
            <h1>Editing Form Path</h1>

            <Link href="/editingform/clubs">Clubs Form</Link>
            <br />
            <Link href="/editingform/organization">Organization Form</Link>
            <br />
            <Link href="/editingform/programme">Programme Form</Link>
            <br />
            <Link href="/editingform/gifted">Gifted Form</Link>
            <br />
            <Link href="/account">Go back to account page</Link>
        </div>
    )
}