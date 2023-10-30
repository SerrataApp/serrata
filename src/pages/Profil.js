import ResumeStats from "../components/profil/ResumeStats";

export default function Profil() {
  return (
    <div className="flex flex-col items-center gap-5">
      <h1 className="text-xl">Pseudo</h1>
      <div className="flex items-center gap-12">
        <ResumeStats/>
        <div>
          <table>
            <tr>
              <th className="p-1 border">Temps</th>
              <th className="p-1 border">Erreurs</th>
            </tr>
            <tr>
              <td className="p-1 border">zefzefzef</td>
              <td className="p-1 border">zefzefzef</td>
            </tr>
            <tr>
              <td className="p-1 border">zefzefzef</td>
              <td className="p-1 border">zefzefzef</td>
            </tr>
            <tr>
              <td className="p-1 border">zefzefzef</td>
              <td className="p-1 border">zefzefzef</td>
            </tr>
            <tr>
              <td className="p-1 border">zefzefzef</td>
              <td className="p-1 border">zefzefzef</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}