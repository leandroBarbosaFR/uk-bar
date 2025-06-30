// deskStructure.ts
import {StructureBuilder} from 'sanity/structure'

const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Pages')
        .child(
          S.list()
            .title('Pages')
            .items([
              S.documentTypeListItem('contactPage').title('Contact Page'),
              S.documentTypeListItem('cocktailBarHirePage').title('Cocktail Bar Hire Page'),
              S.documentTypeListItem('corporateBarHire').title('Corporate Bar Hire Page'),
              S.documentTypeListItem('mobileBarHirePackagesPage').title('Mobile Bar Hire Packages'),
              S.documentTypeListItem('entertainmentPage').title('Entertainment Page'),
              S.documentTypeListItem('privacyPolicyPage').title('Privacy Policy'),
              S.documentTypeListItem('termsAndConditionsPage').title('Terms & Conditions'),
              S.documentTypeListItem('post').title('Blog Posts'),
              S.documentTypeListItem('cookies').title('Cookies'),
            ]),
        ),

      S.divider(),

      S.listItem()
        .title('Sections')
        .child(
          S.list()
            .title('Sections')
            .items([
              S.documentTypeListItem('heroSection').title('Hero Section'),
              S.documentTypeListItem('carouselSection').title('Carousel Section'),
              S.documentTypeListItem('aboutSection').title('About Section'),
              S.documentTypeListItem('whyus').title('Why Us Section'),
              S.documentTypeListItem('embed').title('Video Embed Section'),
              S.documentTypeListItem('textImgSectionLeft').title('Text + Image Left'),
              S.documentTypeListItem('textImgSectionRight').title('Text + Image Right'),
              S.documentTypeListItem('textMarqueeSection').title('Text Marquee Section'),
              S.documentTypeListItem('marqueeSection').title('Marquee Section'),
            ]),
        ),

      S.divider(),

      S.listItem()
        .title('Layout')
        .child(
          S.list()
            .title('Site Layout')
            .items([
              S.documentTypeListItem('header').title('Header'),
              S.documentTypeListItem('footer').title('Footer'),
            ]),
        ),
    ])

export default deskStructure
