import { useContext } from "react";
import { RootWrapper } from "../../wrappers"
import { RootContext } from "../../App";

export const TermsScreen = () => {

  const { currentCompany } = useContext(RootContext) ?? {};
  const { company, name, color : companyColor } = currentCompany ?? {};

  return (
    <RootWrapper>
      <div className="">
        <div className="px-5 py-2">
          <div className="surface-card p-4 border-round">
            <h1 className="text-3xl font-bold mb-4 text-center">Términos y Condiciones de Uso</h1>
            <p className="mb-4 line-height-3">
              Bienvenido a <span className={`${companyColor} font-normal`}>Academia {name}</span>. Al acceder y utilizar esta plataforma, usted acepta cumplir y estar sujeto a los siguientes términos y condiciones de uso.
            </p>

            <h2 className="text-2xl font-semibold mb-3">1. Uso de la Plataforma</h2>
            <ul className="list-none p-0 m-0 mb-4">
              <li className="mb-2">1.1 La <span className={`${companyColor} font-normal`}>Academia {name}</span> es para uso exclusivo de empleados y socios autorizados de nuestra empresa.</li>
              <li className="mb-2">1.2 Usted se compromete a utilizar la plataforma solo para fines de capacitación y desarrollo profesional relacionados con la administración, producción, venta y distribución del producto.</li>
              <li className="mb-2">1.3 No está permitido compartir sus credenciales de acceso con terceros.</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-3">2. Contenido de la Plataforma</h2>
            <ul className="list-none p-0 m-0 mb-4">
              <li className="mb-2">2.1 La plataforma ofrece escuelas temáticas, cursos y videos relacionados con la industria.</li>
              <li className="mb-2">2.2 Todo el contenido de la plataforma, incluyendo textos, imágenes, videos y materiales de estudio, está protegido por derechos de autor.</li>
              <li className="mb-2">2.3 No está permitido descargar, copiar, modificar o distribuir el contenido de la plataforma sin autorización expresa.</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-3">3. Certificaciones</h2>
            <ul className="list-none p-0 m-0 mb-4">
              <li className="mb-2">3.1 Los usuarios pueden obtener certificaciones al completar satisfactoriamente los cursos designados.</li>
              <li className="mb-2">3.2 Las certificaciones son personales e intransferibles.</li>
              <li className="mb-2">3.3 La empresa se reserva el derecho de revocar certificaciones en caso de incumplimiento de estos términos y condiciones.</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-3">4. Privacidad y Datos Personales</h2>
            <ul className="list-none p-0 m-0 mb-4">
              <li className="mb-2">4.1 La información personal y el progreso de aprendizaje de los usuarios se manejarán de acuerdo con nuestra política de privacidad.</li>
              <li className="mb-2">4.2 Los datos de rendimiento y certificación podrán ser compartidos con los supervisores o departamentos relevantes dentro de la empresa.</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-3">5. Responsabilidades del Usuario</h2>
            <ul className="list-none p-0 m-0 mb-4">
              <li className="mb-2">5.1 Usted es responsable de mantener la confidencialidad de su cuenta y contraseña.</li>
              <li className="mb-2">5.2 Se compromete a no utilizar la plataforma para fines ilegales o no autorizados.</li>
              <li className="mb-2">5.3 Debe reportar inmediatamente cualquier uso no autorizado de su cuenta.</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-3">6. Modificaciones y Terminación</h2>
            <ul className="list-none p-0 m-0 mb-4">
              <li className="mb-2">6.1 La empresa se reserva el derecho de modificar estos términos y condiciones en cualquier momento.</li>
              <li className="mb-2">6.2 Nos reservamos el derecho de suspender o terminar su acceso a la plataforma en caso de incumplimiento de estos términos.</li>
            </ul>

            <p className="mb-4 line-height-3">
              Al utilizar la <span className={`${companyColor} font-normal`}>Academia {name}</span>, usted reconoce haber leído, entendido y aceptado estos términos y condiciones. Si tiene alguna pregunta, por favor contacte al departamento de Recursos Humanos.
            </p>

            <p className="text-sm text-color-secondary">
              Última actualización: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </RootWrapper>
  )
}
