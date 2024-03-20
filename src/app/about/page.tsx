import DynamicIsland from "@/components/navigation/nav-bar";
import TextStyles from "@/utils/textstyles";
import { twMerge } from "tailwind-merge";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";

export default function Page() {
  return (
    <div className="flex flex-col p-10 pb-40 h-screen overflow-y-auto bg-black gap-y-10">
      <h2 className={twMerge(TextStyles.H2Gradient, "items-center")}>About</h2>
      <div className="gap-y-5 flex flex-col">
        <p className={twMerge(TextStyles.H4, "")}>Anschrift:</p>
        <div className="gap-y-2 flex flex-col">
          <p>Piguesso AG</p>
          <p>Alt-Friedrichsfelde 60</p>
          <p>Berlin, Germany</p>
        </div>
      </div>
      <div className="flex flex-col gap-y-5">
        <p className={twMerge(TextStyles.H4, "")}>Kontakt: </p>
        <div className="flex flex-col gap-y-2">
          <div className="flex flex-row gap-x-5">
            <LocalPhoneIcon />
            <p>+49 176 00000000</p>
          </div>
          <div className="flex flex-row gap-x-5">
            <EmailIcon /> <p>info@piguesso.com</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-3 bg-black">
        <h4 className={twMerge(TextStyles.H4, "")}>Haftungsausschluss</h4>
        <p>
          Die Nutzung dieser Webseite erfolgt auf eigene Gefahr. Der Betreiber
          übernimmt keine Haftung für Schäden, die aus der Nutzung dieser
          Webseite oder damit verbundenen Diensten entstehen.
        </p>

        <p>
          Die Webseite bietet lediglich eine Plattform für Spieler, um online
          gemeinsam zu spielen. Der Betreiber haftet nicht für Verluste von
          Daten, Unterbrechungen des Spielbetriebs oder andere Störungen, die
          außerhalb seiner Kontrolle liegen.
        </p>

        <p>
          Die Spieler sind für ihr eigenes Verhalten und ihre Handlungen auf der
          Webseite verantwortlich. Der Betreiber behält sich das Recht vor,
          Spieler bei Verstößen gegen die Nutzungsbedingungen zu sperren oder
          den Zugang zur Webseite zu beschränken.
        </p>

        <p>
          Der Betreiber empfiehlt allen Spielern, die Nutzungsbedingungen und
          Datenschutzrichtlinien sorgfältig zu lesen und zu befolgen.
        </p>

        <p>
          Bei Fragen oder Bedenken zum Haftungsausschluss oder zur Nutzung der
          Webseite können Sie sich gerne an uns wenden.
        </p>

        <p>Letzte Aktualisierung: 3/20/2024</p>
      </div>
    </div>
  );
}
