import { createClient, type SanityClient } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId } from "./env";

/**
 * Herkese açık site için OKUMA amaçlı istemci. Bu istemci yalnızca site
 * derlenirken (build time) çalışır — statik dışa aktarım (output: "export")
 * kullanıldığından çalışan sitede runtime'da hiçbir API isteği yapılmaz.
 *
 * Sanity henüz yapılandırılmamışsa (proje ID tanımlı değilse) `null`
 * döner; bu durumda içerik katmanı /data içindeki yedek içeriği kullanır
 * ve site asla boş/bozuk görünmez.
 *
 * Yazma (create/update/delete) işlemleri BURADAN yapılmaz; yalnızca
 * kimliği doğrulanmış yöneticinin /admin panelinden (Sanity Studio) yaptığı
 * işlemler yazma yetkisine sahiptir.
 */
export const sanityClient: SanityClient | null = isSanityConfigured
  ? createClient({
      projectId: projectId as string,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: "published",
      // Veri seti herkese açık okumaya izin verdiği için token gerekmez.
      // Veri seti ileride özel (private) yapılırsa, yalnızca SUNUCU/DERLEME
      // ortamında kullanılan (asla tarayıcıya gönderilmeyen) bu opsiyonel
      // token devreye girer.
      token: process.env.SANITY_API_READ_TOKEN,
    })
  : null;
